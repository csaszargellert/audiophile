const AppError = require('../utils/AppError');
const Comment = require('../models/Comment');
const User = require('../models/User');
const catchAsync = require('../utils/CatchAsync');
const Product = require('../models/Product');
const { AwsBucket } = require('../utils/awsBucket');

const createDeletePicturePromises = function (...pictures) {
  return pictures.map((picture) => AwsBucket.deleteFile(picture));
};

const getProducts = catchAsync(async function (req, res, next) {
  const { favorites } = req.query;

  const query = Product.find();
  if (favorites) {
    const parsedFavorites = JSON.parse(favorites);
    query.in('_id', parsedFavorites);
  }
  const products = await query
    .select('image category name createdAt placeholderImage')
    .exec();

  for (const product of products) {
    const imagePromise = AwsBucket.createSignedUrl(product.image);
    const placeholderImagePromise = AwsBucket.createSignedUrl(
      product.placeholderImage
    );
    const images = await Promise.all([imagePromise, placeholderImagePromise]);
    product.image = images[0];
    product.placeholderImage = images[1];
  }

  res.status(200).json({ data: products });
});

const createProduct = catchAsync(async function (req, res, next) {
  const { name, category, description, price, features } = req.body;

  const session = req.session;
  const user = req.user;

  const newProduct = new Product({
    name,
    category,
    description,
    price,
    image: req.files.image.original[0],
    placeholderImage: req.files.image.resized[0],
    gallery: req.files.gallery.original,
    placeholderGallery: req.files.gallery.resized,
    features,
  });

  try {
    await session.startTransaction();
    const savedProduct = await newProduct.save({ session });

    user.productsId.push(savedProduct.id);
    await user.save({ session, validateBeforeSave: false });

    await session.commitTransaction();

    res.status(200).json({ data: savedProduct });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
});

const getProduct = catchAsync(async function (req, res, next) {
  const { productId } = req.params;

  const foundProduct = await Product.findById(productId)
    .populate({
      path: 'comments',
      select: 'comment user ratings createdAt',
      populate: {
        path: 'user',
        select: 'username',
      },
    })
    .exec();

  if (!foundProduct) {
    throw new AppError('Product not found', 404);
  }

  const imagePromise = AwsBucket.createSignedUrl(foundProduct.image);
  const placeholderImagePromise = AwsBucket.createSignedUrl(
    foundProduct.placeholderImage
  );
  const galleryPromises = foundProduct.gallery.map((galleryImage) =>
    AwsBucket.createSignedUrl(galleryImage)
  );
  const placeholderGalleryPromises = foundProduct.placeholderGallery.map(
    (galleryImage) => AwsBucket.createSignedUrl(galleryImage)
  );

  const pictures = await Promise.all([
    imagePromise,
    placeholderImagePromise,
    ...galleryPromises,
    ...placeholderGalleryPromises,
  ]);

  foundProduct.image = pictures[0];
  foundProduct.placeholderImage = pictures[1];
  foundProduct.gallery = pictures.slice(2, 5);
  foundProduct.placeholderGallery = pictures.slice(5);

  res.status(200).json({ data: foundProduct });
});

const deleteProduct = catchAsync(async function (req, res, next) {
  const { productId } = req.params;
  const session = req.session;
  const user = req.user;

  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  const pictures = createDeletePicturePromises(
    product.image,
    product.placeholderImage,
    ...product.placeholderGallery,
    ...product.gallery
  );
  const deletePictures = await Promise.all(pictures);

  if (!deletePictures.every((picture) => picture.DeleteMarker)) {
    throw new AppError('Image cannot be deleted', 500);
  }

  try {
    await session.startTransaction();

    const deletedProduct = await Product.deleteOne({ _id: productId })
      .session(session)
      .exec();

    if (!deletedProduct) {
      throw new AppError('Product not found', 404);
    }

    const comments = deletedProduct.comments;

    await Comment.deleteMany({
      _id: { $in: comments },
    }).session(session);

    await User.updateMany(
      { comments: { $in: comments } },
      { $pull: { comments: { $in: comments } } }
    ).session(session);

    user.productsId = user.productsId.filter(
      (id) => id.toString() !== productId
    );

    await user.save({ session, validateBeforeSave: false });

    await session.commitTransaction();

    res.status(200).json({ data: 'Product deleted' });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
});

const updateProduct = catchAsync(async function (req, res, next) {
  const { productId } = req.params;
  const { name, category, description, price, features } = req.body;

  const { image, gallery } = req.files;

  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  let imagePromises = null;

  if (image && gallery) {
    imagePromises = createDeletePicturePromises(
      product.image,
      product.placeholderImage,
      ...product.placeholderGallery,
      ...product.gallery
    );
  } else if (image) {
    imagePromises = createDeletePicturePromises(
      product.image,
      product.placeholderImage
    );
  } else if (gallery) {
    imagePromises = createDeletePicturePromises(
      product.gallery,
      product.placeholderGallery
    );
  }

  if (imagePromises) {
    await Promise.all(imagePromises);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      name,
      category,
      description,
      price,
      features,
      image: image && req.files.image.original[0],
      placeholderImage: image && req.files.image.resized[0],
      gallery: gallery && req.files.gallery.original,
      placeholderGallery: gallery && req.files.gallery.resized,
    },
    { runValidators: true, new: true }
  );

  res.status(201).json({ data: updatedProduct });
});

const getProductsByCategory = catchAsync(async function (req, res, next) {
  const { slug } = req.params;
  const products = await Product.filterByCategory(slug);

  for (const product of products) {
    const imagePromise = AwsBucket.createSignedUrl(product.image);
    const placeholderImagePromise = AwsBucket.createSignedUrl(
      product.placeholderImage
    );
    const images = await Promise.all([imagePromise, placeholderImagePromise]);
    product.image = images[0];
    product.placeholderImage = images[1];
  }

  res.status(200).json({ data: products });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsByCategory,
};

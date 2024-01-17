const { AwsBucket } = require('../utils/awsBucket');
const sharp = require('sharp');
const { generateRandomImageName } = require('../utils/randomNameGenerator');
const catchAsync = require('../utils/CatchAsync');

const resizePictures = function (pictures) {
  return pictures.map((picture) => {
    return sharp(picture.buffer)
      .resize(39, 20)
      .toFormat('jpeg')
      .toBuffer({ resolveWithObject: true });
  });
};

const resizeImages = catchAsync(async function (req, res, next) {
  if (Object.keys(req.files).length < 1) {
    return next();
  }

  let resizedImage = null;
  let resizedGallery = null;

  if (req.files.image && req.files.gallery) {
    resizedImage = await Promise.all(resizePictures(req.files?.image));
    resizedGallery = await Promise.all(resizePictures(req.files?.gallery));

    req.files = {
      gallery: {
        resized: resizedGallery,
        original: req.files?.gallery,
      },
      image: {
        resized: resizedImage,
        original: req.files?.image,
      },
    };

    return next();
  }

  if (req.files.image) {
    resizedImage = await Promise.all(resizePictures(req.files?.image));
    req.files = {
      image: {
        resized: resizedImage,
        original: req.files?.image,
      },
    };
    return next();
  }

  if (req.files.gallery) {
    resizedGallery = await Promise.all(resizePictures(req.files?.gallery));
    req.files = {
      gallery: {
        resized: resizedGallery,
        original: req.files?.gallery,
      },
    };

    return next();
  }
});

const uploadPictures = function (original, resized) {
  const originalAssociatedKeys = [];
  const uploadedOriginalImages = original.map((picture) => {
    const randomKey = generateRandomImageName();
    originalAssociatedKeys.push(randomKey);
    return AwsBucket.uploadFile(picture.buffer, picture.mimetype, randomKey);
  });

  const resizedAssociatedKeys = [];
  const uploadedResizedImages = resized.map((picture) => {
    const randomKey = generateRandomImageName();
    resizedAssociatedKeys.push(randomKey);
    return AwsBucket.uploadFile(picture.data, picture.info.format, randomKey);
  });

  return {
    original: {
      keys: originalAssociatedKeys,
      uploadedPromises: uploadedOriginalImages,
    },
    resized: {
      keys: resizedAssociatedKeys,
      uploadedPromises: uploadedResizedImages,
    },
  };
};

const uploadImages = catchAsync(async function (req, res, next) {
  if (Object.keys(req.files).length < 1) {
    return next();
  }

  if (req.files.image && req.files.gallery) {
    const { original: imageOriginal, resized: imageResized } = uploadPictures(
      req.files.image.original,
      req.files.image.resized
    );

    const { original: galleryOriginal, resized: galleryResized } =
      uploadPictures(req.files.gallery.original, req.files.gallery.resized);

    await Promise.all([
      ...imageOriginal.uploadedPromises,
      ...imageResized.uploadedPromises,
    ]);

    await Promise.all([
      ...galleryOriginal.uploadedPromises,
      ...galleryResized.uploadedPromises,
    ]);

    req.files = {
      gallery: {
        resized: galleryResized.keys,
        original: galleryOriginal.keys,
      },
      image: {
        resized: imageResized.keys,
        original: imageOriginal.keys,
      },
    };

    return next();
  }

  if (req.files.image) {
    const { original: imageOriginal, resized: imageResized } = uploadPictures(
      req.files.image.original,
      req.files.image.resized
    );

    await Promise.all([
      ...imageOriginal.uploadedPromises,
      ...imageResized.uploadedPromises,
    ]);

    req.files = {
      image: {
        resized: imageResized.keys,
        original: imageOriginal.keys,
      },
    };

    return next();
  }

  if (req.files.gallery) {
    const { original: galleryOriginal, resized: galleryResized } =
      uploadPictures(req.files.gallery.original, req.files.gallery.resized);

    await Promise.all([
      ...galleryOriginal.uploadedPromises,
      ...galleryResized.uploadedPromises,
    ]);
    req.files = {
      gallery: {
        resized: galleryResized.keys,
        original: galleryOriginal.keys,
      },
    };

    return next();
  }
});

module.exports = { uploadImages, resizeImages };

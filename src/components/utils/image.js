export const serializeName = function (productName) {
  return productName.replace(/[\s]/g, "-");
};

export const constructImagePath = function (name, category, image) {
  const serializedName = serializeName(name);
  return `/assets/product-${serializedName}-${category}/${image}`.toLowerCase();
};

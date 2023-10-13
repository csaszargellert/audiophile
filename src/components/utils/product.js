class Product {
  _name = null;
  _description = null;
  _price = null;
  _category = null;
  _image = null;
  _features = null;
  _gallery = [];

  set Name(value) {
    this._name = value;
  }
  set Description(value) {
    this._description = value;
  }
  set Price(value) {
    this._price = value;
  }
  set Category(value) {
    this._category = value;
  }
  set Image(value) {
    this._image = value;
  }
  set Features(value) {
    this._features = value;
  }
  set Gallery(value) {
    this._gallery.push(value);
  }

  get Name() {
    return this._name;
  }
  get Description() {
    return this._description;
  }
  get Price() {
    return this._price;
  }
  get Category() {
    return this._category;
  }
  get Image() {
    return this._image;
  }
  get Features() {
    return this._features;
  }
  get Gallery() {
    return this._gallery;
  }

  static #instance = null;
  static get Instance() {
    if (this.#instance === null) {
      this.#instance = new Product();
    }
    return this.#instance;
  }

  Clear() {
    this.Name = null;
    this.Description = null;
    this.Price = null;
    this.Category = null;
    this.Image = null;
    this.Features = null;
    this._gallery = [];
  }

  IsEmpty() {
    return (
      !this.Name &&
      !this.Description &&
      !this.Price &&
      !this.Category &&
      !this.Image &&
      !this.Features &&
      !this.Gallery.length
    );
  }
}

export default Product;

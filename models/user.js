const mongoose = require("mongoose");
const Product = require("./product");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.deleteFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.getCart = function () {
  const productIds = this.cart.items.map(i => {
    return i.productId;
  });
  Product.find({ _id: { $in: productIds } }).then(products => {
    return products.map(p => {
      return {
        ...p,
        quantity: this.cart.items.find(i => {
          return i.productId.toString() === p._id.toString();
        }).quantity,
      };
    });
  });
};

userSchema.methods.addToCart = function (product) {
  // If item is already in the cart, just increase the quantity of that product
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];
  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);

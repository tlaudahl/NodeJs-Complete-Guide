const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    path: "/admin/add-product",
    pageTitle: "Add Product",
    editing: false,
  });
};

exports.postAddProduct = (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    req.user._id
  );
  product
    .save()
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res) => {
  Product.getAllProducts()
    .then((products) => {
      res.render("admin/products", {
        pageTitle: "Products",
        path: "/admin/products",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const { edit } = req.query;
  if (!edit) {
    return res.redirect("/admin/product");
  }
  const { productId } = req.params;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/admin/products");
      }
      res.render("admin/edit-product", {
        path: "/admin/edit-product",
        pageTitle: "Edit Product",
        editing: edit,
        product,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const { title, price, description, imageUrl, productId } = req.body;
  const product = new Product(title, price, description, imageUrl, productId);
  product.title = title;
  product.description = description;
  product.price = price;
  product.imageUrl = imageUrl;
  return product
    .save()
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.deleteById(productId)
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

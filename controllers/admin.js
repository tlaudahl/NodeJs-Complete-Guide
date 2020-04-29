const Product = require("../models/product");

exports.getProducts = (req, res) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        path: "/admin/products",
        pageTitle: "Products",
        prods: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    path: "/admin/add-product",
    pageTitle: "Add Product",
    editing: false,
  });
};

exports.postAddProduct = (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  req.user
    .createProduct({
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
      userId: req.user.id,
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const { edit } = req.query;
  if (!edit) {
    return res.redirect("/");
  }
  const { productId } = req.params;
  req.user
    .getProducts({ where: { id: productId } })
    //   Product.findByPk(productId)
    .then((products) => {
      const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        path: "/admin/edit-product",
        pageTitle: "Add Product",
        editing: edit,
        product: product,
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, description, price, imageUrl } = req.body;
  Product.findByPk(productId)
    .then((product) => {
      product.title = title;
      product.description = description;
      product.price = price;
      product.imageUrl = imageUrl;
      return product.save();
    })
    .then((result) => {
      console.log("UPDATED PRODUCT");
    })
    .catch((err) => console.log(err));
  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

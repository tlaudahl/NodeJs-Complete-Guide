const Product = require('../models/product');

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('admin/products', { pageTitle: 'Admin Products', prods: products, path: "/admin/products" })
    })
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', { 
        path: '/admin/add-product', 
        pageTitle: 'Add Product'
    })
}

exports.postAddProduct = (req, res) => {
    const { title, price, description, imageUrl } = req.body;
    const product = new Product(title, price, description, imageUrl)
    product.save();
    res.redirect('/');
}
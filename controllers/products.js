const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', { 
        path: '/admin/add-product', 
        pageTitle: 'Add Product', 
        activeAddProduct: true, 
        formsCSS: true, 
        productCSS: true 
    })
}

exports.postAddProduct = (req, res) => {
    const { title, price, description } = req.body;
    const product = new Product(title, price, description)
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('shop', { prods: products, path: '/', pageTitle: 'Shop', activeShop: true, productCSS: true });
    });
}
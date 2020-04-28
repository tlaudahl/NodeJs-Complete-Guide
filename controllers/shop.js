const Product = require('../models/product');

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', { prods: products, path: '/products', pageTitle: 'Shop' });
    });
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', { prods: products, path: '/', pageTitle: 'Shop' });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    })
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}
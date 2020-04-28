const Product = require('../models/product');

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', { prods: products, path: '/products', pageTitle: 'Shop' });
    });
}

exports.getProduct = (req, res, next) => {
    const { productId } = req.params;
    Product.findById(productId, product => {
        res.render('shop/product-detail.ejs', { product, pageTitle: product.title, path: "/products" });
    })
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

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: "Your Orders"
    })
}

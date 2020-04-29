const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res) => {
    Product.fetchAll()
    .then(([rows]) => {
        res.render('shop/product-list', {
            pageTitle: 'All Products',
            path: '/products',
            prods: rows
        })
    })
    .catch(err => console.log(err));
}

exports.getProduct = (req, res, next) => {
    const { productId } = req.params;
    Product.findById(productId).then(([product]) => {
        res.render('shop/product-detail.ejs', { product: product[0], pageTitle: product.title, path: "/products" });
    }).catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render('shop/index', {
            pageTitle: 'Shop',
            path: '/',
            prods: rows
        })
    })
    .catch(err => {console.log(err)});
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
            if (cartProductData) {
                cartProducts.push({ productData: product, qty: cartProductData.qty });
            }}
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: cartProducts
            });
        });
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const { productId } = req.body;
    Product.findById(productId, product => {
        Cart.deleteProduct(productId, product.price);
        res.redirect('/cart');
    });
};

exports.postCart = (req, res, next) => {
    const { productId } = req.body;
    Product.findById(productId, product => {
        Cart.addProduct(productId, product.price);
    })
    res.redirect('/cart');
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

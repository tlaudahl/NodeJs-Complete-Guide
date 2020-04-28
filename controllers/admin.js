const Product = require('../models/product');

exports.getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('admin/products', { pageTitle: 'Admin Products', prods: products, path: "/admin/products" });
    });
};

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', { 
        path: '/admin/add-product', 
        pageTitle: 'Add Product',
        editing: false
    });
};

exports.postAddProduct = (req, res) => {
    const { title, price, description, imageUrl } = req.body;
    const product = new Product(null, title, price, description, imageUrl);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const { edit } = req.query;
    if(!edit) {
        return res.redirect('/');
    }
    const { productId } = req.params;
    Product.findById(productId, product => {
        if(!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', { 
            path: '/admin/edit-product',
            pageTitle: 'Add Product',
            editing: edit,
            product
        })
    });
};

exports.postEditProduct = (req, res, next) => {
    const { productId, title, description, price, imageUrl } = req.body;
    const updatedProduct = new Product(productId, title, price, description, imageUrl);
    updatedProduct.save();
    res.redirect('/admin/products')
};

exports.postDeleteProduct = (req, res, next) => {
    const { productId } = req.body;
    Product.deleteProduct(productId);
    res.redirect('/admin/products');
};
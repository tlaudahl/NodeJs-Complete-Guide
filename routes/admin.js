const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', { path: '/admin/add-product', pageTitle: 'Add Product', activeAddProduct: true, formsCSS: true, productCSS: true })
});

router.post('/add-product', (req, res) => {
    const { title, price, description } = req.body;
    products.push({ title, price, description })
    res.redirect('/');
})

module.exports = {
    routes: router,
    products: products
}
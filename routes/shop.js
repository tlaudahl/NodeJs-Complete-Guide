const path = require('path');

const rootDir = require('../util/path');
const adminData = require('./admin');

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const products = adminData.products;
    res.render('shop', { prods: products, path: '/', pageTitle: 'Shop', activeShop: true, productCSS: true });
});

module.exports = router;
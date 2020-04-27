const products = [];

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
    products.push({ title, price, description })
    res.redirect('/');
}

exports.getProducts = (req, res) => {
    res.render('shop', { prods: products, path: '/', pageTitle: 'Shop', activeShop: true, productCSS: true });
}
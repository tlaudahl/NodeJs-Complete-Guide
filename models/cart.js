const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json')

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, file) => {
            let cart = {products: [], totalPrice: 0};
            if (!err) {
                cart = JSON.parse(file);
            }
            // Analyze the cart => Find existing product
            const existingProdIndex = cart.products.findIndex(item => item.id === id);
            const existingProduct = cart.products[existingProdIndex];
            let updatedProduct;
            // Add new product or increase the quantity
            if(existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty += 1;
                cart.products = [...cart.products];
                cart.products[existingProdIndex] = updatedProduct;
            } else {
                updatedProduct = { id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice += +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.error(err);
            })
        })
    }
}
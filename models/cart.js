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
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProdIndex] = updatedProduct;
            } else {
                updatedProduct = { id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.error(err);
            })
        })
    }

    static deleteProduct(id, price) {
        fs.readFile(p, (err, file) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(file) };
            const product = updatedCart.products.find(item => item.id === id);
            if(!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(item => item.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - price * productQty;

            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.error(err);
            });
        });
    };

    static getCart(cb) {
        fs.readFile(p, (err, fileContents) => {
            const cart = JSON.parse(fileContents);
            if(err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    };
};
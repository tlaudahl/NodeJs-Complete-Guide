const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')

const getProductsFromFile = cb => {
    fs.readFile(p, (err, data) => {
        if(err) {
            cb([])
        } else {
            cb(JSON.parse(data));
        }
    })
}

module.exports = class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.error(err);
            })
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}
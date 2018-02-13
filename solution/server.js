const express = require('express');
const app = express();

let products = [];

app.get('/products', (req, res) => {
    let matchingProducts = products;
    const q = req.query.q;
    if (q) {
        matchingProducts = products
            .filter(p => p.name
                .toLowerCase()
                .includes(q.toLowerCase())
            );
    }

    res.json({
        products: matchingProducts
    });
});

app.get('/products/:id', (req, res) => {
    const matchedProduct = products.filter(p => p.id == req.params.id)[0];

    if (matchedProduct) {
        res.json(matchedProduct);
    } else {
        res.status(404).end();
    }
});

app.listen(3000, () => console.log('API is running on http://localhost:3000'));

module.exports = app;

module.exports.setProducts = p => products = p;
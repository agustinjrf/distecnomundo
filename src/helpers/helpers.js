const helpers = {};

const { products } = require('../handlers/db');

helpers.validateForm = (req, res, next) => {
    // Validation
};

helpers.validateProduct = (req, res, next) => {
    // Validation

    let thereisnot = true;

    products.forEach((product) => {
        if (product.code == req.params.id) {
            next();
            thereisnot = false;
        }
    });

    if (thereisnot) {
        res.redirect('/catalog');
    }
};

helpers.validateCart = (req, res, next) => {
    // Validation of cart
    if (req.cookies.cart[0] == undefined) {
        res.redirect('/catalog');
    } else {
        next();
    }
};

// Crear una cookie para el carrito
helpers.createCart = (req, res, next) => {
    if (req.cookies.cart) {
    } else {
        res.cookie('cart', []);
    }

    if (req.cookies.price) {
    } else {
        res.cookie('price', 0);
    }

    next();
};

module.exports = helpers;

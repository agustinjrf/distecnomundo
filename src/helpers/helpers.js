const helpers = {};
const Task = require('../models/Product');

helpers.validateForm = (req, res, next) => {
    // *VALIDANDO DATOS DEL FORMULARIO
};

helpers.validateProduct = async (req, res, next) => {
    const products = await Task.find().lean();

    let thereisnot = true;

    // *VALIDANDO LA EXISTENCIA DEL PRODUCTO
    products.forEach((product) => {
        if (product.code == req.params.id) {
            thereisnot = false;
            next();
        }
    });

    if (thereisnot) {
        res.redirect('/catalog');
    }
};

helpers.validateCart = (req, res, next) => {
    // *VALIDANDO CARRITO
    if (req.cookies.cart[0] == undefined) {
        res.redirect('/catalog');
    } else {
        next();
    }
};

helpers.createCookies = (req, res, next) => {
    // *CREANDO COOKIE DEL CARRITO
    if (!req.cookies.cart) {
        res.cookie('cart', []);
    }

    // *CREANDO COOKIE DEL PRECIO
    if (!req.cookies.price) {
        res.cookie('price', 0);
    }

    next();
};

module.exports = helpers;

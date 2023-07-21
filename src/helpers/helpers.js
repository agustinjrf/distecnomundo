const helpers = {};

helpers.validateForm = (req, res, next) => {
    // Validation
};

// Crear una cookie para el carrito
helpers.createCart = (req, res, next) => {
    if (req.cookies.cart) {
    } else {
        res.cookie('cart', []);
    }

    next();
};

module.exports = helpers;

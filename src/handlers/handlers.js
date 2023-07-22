const handlers = {};

const uuid = require('uuid');

const { products, igPost } = require('./db');

handlers.renderIndex = (req, res) => {
    let mainProducts = [];

    for (let i = 1; i < 7; i++) {
        mainProducts[i] = products[Math.ceil(Math.random() * 100)];
    }

    res.render('index', { mainProducts, igPost });
};

handlers.sendOrder = (req, res) => {
    res.cookie('cart', []);
    res.cookie('price', 0);
    res.redirect('/');
};

handlers.renderCheckout = (req, res) => {
    // Obteniendo el carrito
    let minCart = req.cookies.cart;

    let cart = [];

    let price = 0;

    let userItem;

    minCart.forEach((cartItem) => {
        products.forEach((storeItem) => {
            if (cartItem.product == storeItem.code) {
                userItem = {
                    product: storeItem,
                    quantity: cartItem.quantity,
                    id: uuid.v4(),
                };

                cart.push(userItem);
            }
        });
    });

    // Calculando el valor del carrito
    cart.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
            price += item.product.price;
        }
    });

    res.render('checkout', { cart, price });
};

handlers.renderCatalog = (req, res) => {
    res.render('catalog', { products });
};

handlers.renderProduct = (req, res) => {
    let item;

    products.forEach((product) => {
        if (product.code == req.params.id) {
            item = product;
        }
    });

    let mainProducts = [];

    for (let i = 1; i < 7; i++) {
        mainProducts[i] = products[Math.ceil(Math.random() * 100)];
    }

    res.render('product', { item, mainProducts });
};

// Carrito
handlers.renderCart = (req, res) => {
    // Obteniendo el carrito
    let minCart = req.cookies.cart;

    let cart = [];

    let price = 0;

    let userItem;

    minCart.forEach((cartItem) => {
        products.forEach((storeItem) => {
            if (cartItem.product == storeItem.code) {
                userItem = {
                    product: storeItem,
                    quantity: cartItem.quantity,
                    id: uuid.v4(),
                };

                cart.push(userItem);
            }
        });
    });

    // Calculando el valor del carrito
    cart.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
            price += item.product.price;
        }
    });

    res.render('cart', { cart, price });
};

// Añadir productos al carrito
handlers.addProduct = (req, res) => {
    let product;

    // Obteniendo el producto
    products.forEach((item) => {
        if (item.code == req.body.id) {
            product = item;
        }
    });

    // Creando el item para el carrito
    let item = {
        product: product.code,
        quantity: parseInt(req.body.quantity),
        id: uuid.v4(),
    };

    // Obteniendo el carrito
    let cart = req.cookies.cart;

    // Agregando el producto al carrito
    cart.push(item);

    // Guardando los cambios del carrito
    res.cookie('cart', cart);

    if (req.cookies.price) {
    } else {
        res.cookie('price', 0);
    }

    if (req.cookies.cart) {
        // Obteniendo el carrito
        let minCart = req.cookies.cart;

        let cart = [];

        let price = 0;

        let userItem;

        minCart.forEach((cartItem) => {
            products.forEach((storeItem) => {
                if (cartItem.product == storeItem.code) {
                    userItem = {
                        product: storeItem,
                        quantity: cartItem.quantity,
                        id: uuid.v4(),
                    };

                    cart.push(userItem);
                }
            });
        });

        // Calculando el valor del carrito
        cart.forEach((item) => {
            for (let i = 0; i < item.quantity; i++) {
                price += item.product.price;
            }
        });

        res.cookie('price', price);
    }

    // render cart
    res.redirect('/catalog');
};

// Eliminar productos del carrito
handlers.deleteProduct = (req, res) => {
    let cart = req.cookies.cart;

    let counter = 0;

    let drop;

    // Obteniendo el índice del producto
    cart.forEach((item) => {
        if (item.id == req.params.id) {
            drop = counter;
        } else {
            counter++;
        }
    });

    // Borrando el producto
    cart.splice(drop, 1);

    // Guardando los cambios del carrito
    res.cookie('cart', cart);

    if (req.cookies.price) {
    } else {
        res.cookie('price', 0);
    }

    if (req.cookies.cart) {
        // Obteniendo el carrito
        let minCart = req.cookies.cart;

        let cart = [];

        let price = 0;

        let userItem;

        minCart.forEach((cartItem) => {
            products.forEach((storeItem) => {
                if (cartItem.product == storeItem.code) {
                    userItem = {
                        product: storeItem,
                        quantity: cartItem.quantity,
                        id: uuid.v4(),
                    };

                    cart.push(userItem);
                }
            });
        });

        // Calculando el valor del carrito
        cart.forEach((item) => {
            for (let i = 0; i < item.quantity; i++) {
                price += item.product.price;
            }
        });

        res.cookie('price', price);
    }

    res.redirect('/cart');
};

handlers.renderPrivacyPolitic = (req, res) => {
    res.render('privacy-politic');
};

module.exports = handlers;

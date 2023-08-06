const handlers = {};

const uuid = require('uuid');

const igPost = [
    {
        img: './images/ig01.png',
        url: 'https://www.instagram.com/distecnomundo/?hl=e',
    },
    {
        img: './images/ig02.png',
        url: 'https://www.instagram.com/distecnomundo/?hl=e',
    },
    {
        img: './images/ig03.png',
        url: 'https://www.instagram.com/distecnomundo/?hl=e',
    },
    {
        img: './images/ig04.png',
        url: 'https://www.instagram.com/distecnomundo/?hl=e',
    },
];

require('../database');
const Order = require('../models/Order');
const Product = require('../models/Product');

const products = require('../handlers/Distecnomundo.Products.json');

function calcPrice(cookiesUserCart) {
    // *OBTENIENDO EL CARRITO
    const cart = cookiesUserCart;
    let updatedPrice = 0;

    // *LEYENDO EL CARRITO
    cart.forEach((cartItem) => {
        products.forEach((productsItem) => {
            // Productos que estan en el carrito
            if (cartItem.product == productsItem.code) {
                // *CALCULANDO EL VALOR DEL CARRITO
                for (let i = 0; i < cartItem.quantity; i++) {
                    updatedPrice += productsItem.price;
                }
            }
        });
    });

    return updatedPrice;
}

function cartExtender(cookiesUserCart) {
    // Obteniendo el carrito
    let cookiesCart = cookiesUserCart;

    let cartExtended = [];
    let userItem;

    cookiesCart.forEach((cartItem) => {
        products.forEach((storeItem) => {
            // *AGREGANDO PRODUCTOS A LA VERSION EXTENDIDA DEL CARRITO
            if (cartItem.product == storeItem.code) {
                userItem = {
                    product: storeItem,
                    quantity: cartItem.quantity,
                    id: cartItem.id,
                };

                cartExtended.push(userItem);
            }
        });
    });

    return cartExtended;
}

// ? Evitar que los productos se puedan repetir
function randomProducts() {
    let randomProducts = [];

    for (let i = 1; i < 7; i++) {
        randomProducts[i - 1] = products[Math.ceil(Math.random() * 100)];
    }

    return randomProducts;
}

handlers.renderIndex = (req, res) => {
    // Productos que se muestran como recomendacion
    const feedProducts = randomProducts();

    res.render('index', { feedProducts, igPost });
};

handlers.sendOrder = (req, res) => {
    // *REINICIANDO CARRITO Y CONTEDOR DEL MENU
    res.cookie('cart', []);
    res.cookie('price', 0);

    // !Enviar pedido a la base de datos
    // !Enviar aviso al cliente

    // Mensaje de pedido en revision
    req.flash('info_msg', 'Su pedido está en revisión');

    res.redirect('/');
};

handlers.renderCheckout = (req, res) => {
    // *EXTENDIENDO EL CARRITO
    const cart = cartExtender(req.cookies.cart);
    // *CALCULANDO EL PRECIO DEL CARRITO
    const price = calcPrice(req.cookies.cart);

    res.render('checkout', { cart, price });
};

handlers.renderCatalog = async (req, res) => {
    res.render('catalog', { products });
};

handlers.renderProduct = (req, res) => {
    let item;

    // Productos que se muestran como recomendacion
    const feedProducts = randomProducts();

    // *BUSCANDO EL PRODUCTO EN LA BASE DE DATOS
    products.forEach((product) => {
        if (product.code == req.params.id) {
            item = product;
        }
    });

    res.render('product', { item, feedProducts });
};

handlers.renderCart = (req, res) => {
    // *EXTENDIENDO EL CARRITO
    const cart = cartExtender(req.cookies.cart);
    // *CALCULANDO EL PRECIO DEL CARRITO
    const price = calcPrice(req.cookies.cart);

    res.render('cart', { cart, price });
};

handlers.addProduct = (req, res) => {
    let newItem;

    // *OBTENIENDO PRODUCTO PARA EL CARRITO
    products.forEach((item) => {
        if (item.code == req.body.id) {
            newItem = {
                product: item.code,
                quantity: parseInt(req.body.quantity),
                id: uuid.v4(),
            };
        }
    });

    // *OBTENIENDO EL CARRITO
    let cart = req.cookies.cart;

    // *AGRAGANDO EL NUEVO PRODUCTO
    cart.push(newItem);
    res.cookie('cart', cart);

    // *CALCULANDO EL PRECIO PARA LA NAVEGACION Y EL MENU
    res.cookie('price', calcPrice(cart));

    // Mensaje de producto agregado
    req.flash('success_msg', 'Producto añadido al carrito');

    res.redirect('/catalog');
};

handlers.deleteProduct = (req, res) => {
    let cart = req.cookies.cart;
    let counter = 0;
    let drop;

    // *OBTENIENDO EL INDICE DEL PRODUCTO
    cart.forEach((item) => {
        if (item.id == req.params.id) {
            drop = counter;
        } else {
            counter++;
        }
    });

    // *BORRANDO EL PRODUCTO
    cart.splice(drop, 1);

    // *ACTUALIZANDO EL CARRITO
    res.cookie('cart', cart);

    // *CREANDO COOKIES PARA EL PRECIO DE LA NAVEGACION Y EL MENU
    res.cookie('price', 0);

    // *CALCULANDO EL PRECIO PARA LA NAVEGACION Y EL MENU
    res.cookie('price', calcPrice(cart));

    // Mensaje de producto eliminado
    req.flash('success_msg', 'Producto eliminado del carrito');

    res.redirect('/cart');
};

handlers.renderPrivacyPolitic = (req, res) => {
    res.render('privacy-politic');
};

module.exports = handlers;

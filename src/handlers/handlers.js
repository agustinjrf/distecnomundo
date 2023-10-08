const handlers = {};
const Task = require('../models/Product');
const Order = require('../models/Order');

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

handlers.renderIndex = async (req, res) => {
    // Productos que se muestran como recomendacion
    let randomProducts = [];
    const products = await Task.find().lean();

    for (let i = 1; i < 7; i++) {
        randomProducts[i - 1] = products[Math.ceil(Math.random() * 100)];
    }

    const feedProducts = randomProducts;

    res.render('index', { feedProducts, igPost });
};

handlers.sendOrder = async (req, res) => {
    // !Enviar pedido a la base de datos
    const {
        nombre,
        apellido,
        ci,
        telefono,
        correo,
        estado,
        ciudad,
        envioDireccion,
        envioCodigo,
        metodoEnvio,
        metodoPago,
    } = req.body;
    const newOrder = new Order({
        order: {
            nombre,
            apellido,
            ci,
            telefono,
            correo,
            estado,
            ciudad,
            envioDireccion,
            envioCodigo,
            metodoEnvio,
            metodoPago,
        },
        cart: req.cookies.cart,
    });

    await newOrder.save();

    // *REINICIANDO CARRITO Y CONTEDOR DEL MENU
    res.cookie('cart', []);
    res.cookie('price', 0);

    // !Enviar aviso al cliente
    // Mensaje de pedido en revision
    req.flash('info_msg', 'Su pedido está en revisión');

    res.redirect('/');
};

handlers.renderCheckout = async (req, res) => {
    // *EXTENDIENDO EL CARRITO
    // Obteniendo el carrito
    let cookiesCart = req.cookies.cart;
    const products = await Task.find().lean();

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

    const cart = cartExtended;
    // *CALCULANDO EL PRECIO DEL CARRITO
    // *OBTENIENDO EL CARRITO
    const cart2 = req.cookies.cart;
    let updatedPrice = 0;

    // *LEYENDO EL CARRITO
    cart2.forEach((cartItem) => {
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

    const price = updatedPrice;

    res.render('checkout', { cart, price });
};

handlers.renderCatalog = async (req, res) => {
    const products = await Task.find().lean();

    res.render('catalog', { products });
};

handlers.renderProduct = async (req, res) => {
    let item;

    // Productos que se muestran como recomendacion
    let randomProducts = [];
    const products = await Task.find().lean();

    for (let i = 1; i < 7; i++) {
        randomProducts[i - 1] = products[Math.ceil(Math.random() * 100)];
    }

    const feedProducts = randomProducts;

    // *BUSCANDO EL PRODUCTO EN LA BASE DE DATOS
    products.forEach((product) => {
        if (product.code == req.params.id) {
            item = product;
        }
    });

    res.render('product', { item, feedProducts });
};

handlers.renderCart = async (req, res) => {
    // *EXTENDIENDO EL CARRITO
    // Obteniendo el carrito
    let cookiesCart = req.cookies.cart;
    const products = await Task.find().lean();

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

    const cart = cartExtended;

    // *CALCULANDO EL PRECIO DEL CARRITO
    const cart2 = req.cookies.cart;
    let updatedPrice = 0;

    // *LEYENDO EL CARRITO
    cart2.forEach((cartItem) => {
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

    const price = updatedPrice;

    res.render('cart', { cart, price });
};

handlers.addProduct = async (req, res) => {
    let newItem;
    const products = await Task.find().lean();

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
    const cart2 = req.cookies.cart;
    let updatedPrice = 0;

    // *LEYENDO EL CARRITO
    cart2.forEach((cartItem) => {
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

    const price = updatedPrice;
    res.cookie('price', price);

    // Mensaje de producto agregado
    req.flash('success_msg', 'Producto añadido al carrito');

    res.redirect('/catalog');
};

handlers.deleteProduct = async (req, res) => {
    let cart = req.cookies.cart;
    let counter = 0;
    let drop;
    const products = await Task.find().lean();

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
    const cart2 = req.cookies.cart;
    let updatedPrice = 0;

    // *LEYENDO EL CARRITO
    cart2.forEach((cartItem) => {
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

    const price = updatedPrice;
    res.cookie('price', price);

    // Mensaje de producto eliminado
    req.flash('success_msg', 'Producto eliminado del carrito');

    res.redirect('/cart');
};

handlers.renderPrivacyPolitic = (req, res) => {
    res.render('privacy-politic');
};

module.exports = handlers;

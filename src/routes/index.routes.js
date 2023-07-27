const router = require('express').Router();

const {
    renderIndex,
    renderCatalog,
    renderProduct,
    renderCart,
    addProduct,
    deleteProduct,
    renderCheckout,
    sendOrder,
    renderPrivacyPolitic,
} = require('../handlers/handlers');
const {
    createCookies,
    validateCart,
    validateProduct,
} = require('../helpers/helpers');

// Pagina principal
router.get('/', createCookies, renderIndex);

// Catalogo
router.get('/catalog', createCookies, renderCatalog);

// Producto individual
router.get('/catalog/:id', createCookies, validateProduct, renderProduct);

// Carrito
router.get('/cart', createCookies, renderCart);

// Checkout
router.get('/checkout', createCookies, validateCart, renderCheckout);

// Enviar orden
router.post('/send-order', sendOrder);

// Añadir producto al carrito
router.post('/add-product', addProduct);

// Eliminar producto al carrito
router.delete('/delete-product/:id', deleteProduct);

// Politicas de privacidad
router.get('/privacy-politic', renderPrivacyPolitic);

module.exports = router;

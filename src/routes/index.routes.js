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
    createCart,
    validateCart,
    validateProduct,
} = require('../helpers/helpers');

// Pagina principal
router.get('/', createCart, renderIndex);

// Catalogo
router.get('/catalog', createCart, renderCatalog);

// Producto individual
router.get('/catalog/:id', createCart, validateProduct, renderProduct);

// Carrito
router.get('/cart', createCart, renderCart);

// Checkout
router.get('/checkout', createCart, validateCart, renderCheckout);

router.post('/send-order', sendOrder);

// Añadir producto al carrito
router.post('/add-product', createCart, addProduct);

// Eliminar producto al carrito
router.delete('/delete-product/:id', createCart, deleteProduct);

// Eliminar producto al carrito
router.get('/privacy-politic', renderPrivacyPolitic);

module.exports = router;

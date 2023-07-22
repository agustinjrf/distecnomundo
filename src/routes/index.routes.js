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
} = require('../handlers/handlers');
const { createCart } = require('../helpers/helpers');

// Pagina principal
router.get('/', createCart, renderIndex);

// Catalogo
router.get('/catalog', createCart, renderCatalog);

// Producto individual
router.get('/catalog/:id', createCart, renderProduct);

// Carrito
router.get('/cart', createCart, renderCart);

// Checkout
router.get('/checkout', createCart, renderCheckout);

router.post('/send-order', sendOrder);

// Añadir producto al carrito
router.post('/add-product', createCart, addProduct);

// Eliminar producto al carrito
router.delete('/delete-product/:id', createCart, deleteProduct);

module.exports = router;

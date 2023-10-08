const { Schema, model } = require('mongoose');

const OrderSchema = new Schema(
    {
        order: { type: Object, required: true },
        cart: { type: Array, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = model('Order', OrderSchema);

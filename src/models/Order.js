const { Schema, model } = require('mongoose');

const OrderSchema = new Schema(
    {
        order: { type: {}, required: true },
        user: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = model('Order', OrderSchema);

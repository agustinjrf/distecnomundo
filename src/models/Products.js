const { Schema, model } = require('mongoose');

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true, unique: true },
        description: { type: String, required: true },
        label: { type: {} },
        categoria: { type: {} },
        img: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = model('Product', ProductSchema);

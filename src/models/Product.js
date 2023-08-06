const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    code: { type: Number },
    title: { type: String },
    front: { type: String },
    imgs: { type: Array },
    active: { type: Boolean },
    promPrice: { type: Number },
    price: { type: Number },
    description: { type: String },
    tags: { type: [] },
    features: { type: {} },
});

module.exports = model('Product', ProductSchema, 'Products');

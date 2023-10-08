const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    code: {
        type: Number,
        require: true,
    },
    active: {
        type: Boolean,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    front: {
        type: String,
        require: true,
    },
    imgs: {
        type: Array,
        require: true,
    },
    tags: {
        type: Array,
        require: true,
    },
    mercadoLibre: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    features: {
        type: Object,
        require: true,
    },
    promPrice: {
        type: Number,
        require: true,
    },
});

module.exports = mongoose.model('Task', taskSchema);

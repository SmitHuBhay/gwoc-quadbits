const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: String,
    price: Number,
    discountPrice: Number,   
    discountPercent: { type: Number, default: 0 },
    duration: String,
    imageURL: String,
    category: { 
        type: String, 
        enum: ['Ice Bath', 'Jacuzzi', 'Steam', 'Combo'] 
    }
});

module.exports = mongoose.model('Service', serviceSchema);
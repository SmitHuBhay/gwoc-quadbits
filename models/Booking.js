const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    customerName: String,
    email: String,
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    date: Date,
    timeSlot: String,
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });
module.exports = mongoose.model('Booking', bookingSchema);
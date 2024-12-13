const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telephone_no: { type: String, required: false, unique: true },
    role: { type: String, enum: ['admin', 'driver', 'passenger'], required: true, default: 'passenger' },
});

module.exports = mongoose.model('User', userSchema);

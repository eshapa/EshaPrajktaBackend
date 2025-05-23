const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    shopName: { type: String, required: true },
    owner: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    location: { type: String },
    businessLicense: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Shop', shopSchema);

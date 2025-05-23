const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  gender: String,
  phone: String,
  email: String,
  city: String,
  address: String,
  occasion: String,
  dueDate: String,
  fabricType: String,
  dressType: String,
  referenceImage: String, // Optional: store filename or URL
  instructions: String,
  height: String,
  chest: String,
  waist: String,
  hip: String,
  shoulder: String,
  sleeveLength: String,
  inseam: String,
  neck: String,
  status: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

const mongoose = require('mongoose');

const tailorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  gender: { type: String },
  city: { type: String },
  shopName: { type: String },
  tailorType: { type: String },
  experience: { type: String },
  specialty: { type: String },
  location: { type: String },
  pricingModel: { type: String }
}, { timestamps: true });

const Tailor = mongoose.model('Tailor', tailorSchema);
module.exports = Tailor;

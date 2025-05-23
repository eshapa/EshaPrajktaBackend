const mongoose = require('mongoose');

const fabricSubtypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [String], // array of image filenames
  price: { type: Number, required: true }
});

const fabricCategorySchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  categoryName: { type: String, required: true },
  subtypes: [fabricSubtypeSchema]
}, { timestamps: true });

module.exports = mongoose.model('FabricCategory', fabricCategorySchema);
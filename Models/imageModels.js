const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  tailorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tailor',
    required: true,
  },
  imagePath: { type: String, required: true },
  caption: { type: String, default: '' },
  category: { type: String, default: 'General' },
});

// ✅ Fix overwrite error
const Image = mongoose.models.Image || mongoose.model('Image', imageSchema);

module.exports = Image;

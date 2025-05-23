const mongoose = require('mongoose');

const tempEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // auto-delete after 1 hour (optional)
  }
});

module.exports = mongoose.model('TempEmail', tempEmailSchema);

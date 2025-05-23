const express = require('express');
const multer = require('multer'); // Make sure multer is imported for error handling
const router = express.Router();
const fabricController = require('../controller/fabricController');
const upload = require('../middleware/uploadFiles');

// Route to add multiple categories with multiple subtypes and images
router.post('/add-multiple-categories', upload.any(), fabricController.createMultipleCategories);

// Get all fabric categories by shopId
router.get('/shop/:shopId', fabricController.getFabricsByShop);

// Multer error handling middleware
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || (err.message && err.message.includes('Only image files'))) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});

module.exports = router;
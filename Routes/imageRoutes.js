const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {
  uploadMultipleImages,
  getAllImages,
  getImagesByTailorId,
} = require('../controller/imageController');

// 🔧 Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/portfolio';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// 🔧 Routes
router.post('/upload/:tailorId', upload.array('images'), uploadMultipleImages);
router.get('/', getAllImages);
router.get('/:tailorId', getImagesByTailorId);

module.exports = router;

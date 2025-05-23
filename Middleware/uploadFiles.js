const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads/portfolio folder if it doesn't exist
const uploadPath = path.join(__dirname, '..', 'uploads', 'portfolio');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Save file with timestamp + original name to avoid name clashes
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Allow only specific image types
const allowedTypes = /jpeg|jpg|png|webp|avif/;

const fileFilter = (req, file, cb) => {
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype.startsWith('image/');
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

module.exports = multer({ storage, fileFilter });

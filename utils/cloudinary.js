const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // dl20sndiu
  api_key: process.env.CLOUDINARY_API_KEY,        // 414193244523231
  api_secret: process.env.CLOUDINARY_API_SECRET,  // _26H4T6fb9aP
});

module.exports = cloudinary;

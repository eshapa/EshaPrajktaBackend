const Image = require('../Models/imageModels');
const Tailor = require('../Models/tailorModel');
const path = require('path');

const uploadMultipleImages = async (req, res) => {
  try {
    const tailorId = req.params.tailorId;

    const tailor = await Tailor.findById(tailorId);
    if (!tailor) return res.status(404).json({ message: 'Tailor not found' });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    const imageEntries = req.files.map((file, index) => ({
      tailorId,
      imagePath: `/uploads/portfolio/${file.filename}`,
      caption: req.body[`caption_${index}`] || '',
      category: req.body[`category_${index}`] || 'Uncategorized',
    }));

    const savedImages = await Image.insertMany(imageEntries);

    res.status(201).json({
      message: 'Images uploaded successfully',
      images: savedImages,
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
};

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().populate('tailorId');
    res.status(200).json(images);
  } catch (error) {
    console.error('Get all images error:', error);
    res.status(500).json({ message: 'Fetch failed', error: error.message });
  }
};

const getImagesByTailorId = async (req, res) => {
  try {
    const { tailorId } = req.params;
    const images = await Image.find({ tailorId }).populate('tailorId');
    res.status(200).json(images);
  } catch (error) {
    console.error('Get images by tailor error:', error);
    res.status(500).json({ message: 'Fetch failed', error: error.message });
  }
};

module.exports = {
  uploadMultipleImages,
  getAllImages,
  getImagesByTailorId,
};

const Tailor = require('../Models/tailorModel');

// Register a new tailor (gender included)
const registerTailor = async (req, res) => {
  try {
    const {
      name, email, password, phone,
      gender, city, shopName,
      experience, specialty, location, pricingModel
    } = req.body;

    if (!name || !email || !password || !gender) {
      return res.status(400).json({ error: 'Name, email, password, and gender are required.' });
    }

    const existingTailor = await Tailor.findOne({ email });
    if (existingTailor) {
      return res.status(400).json({ error: 'Tailor already registered with this email.' });
    }

    const newTailor = new Tailor({
      name, email, password, phone,
      gender, city, shopName,
      experience, specialty, location, pricingModel
    });

    await newTailor.save();
    res.status(201).json({ message: 'Tailor registered successfully.', tailor: newTailor });
  } catch (error) {
    console.error('Error registering tailor:', error);
    res.status(500).json({ error: 'Server error during registration.' });
  }
};

// Get all tailors
const getAllTailors = async (req, res) => {
  try {
    const tailors = await Tailor.find();
    res.status(200).json(tailors);
  } catch (error) {
    console.error('Error fetching tailors:', error);
    res.status(500).json({ error: 'Server error while fetching tailors.' });
  }
};

// Get tailor by ID
const getTailorById = async (req, res) => {
  try {
    const tailor = await Tailor.findById(req.params.id);
    if (!tailor) {
      return res.status(404).json({ error: 'Tailor not found.' });
    }
    res.status(200).json(tailor);
  } catch (error) {
    console.error('Error fetching tailor:', error);
    res.status(500).json({ error: 'Server error while fetching tailor.' });
  }
};

// ✅ New: Get tailors by gender
const getTailorsByGender = async (req, res) => {
  try {
    const { gender } = req.params;

    // Convert gender to proper case (optional) OR match strictly
    const tailors = await Tailor.find({ gender: { $regex: `^${gender}$`, $options: 'i' } }); // exact match

    res.status(200).json(tailors);
  } catch (error) {
    console.error('Error fetching tailors by gender:', error);
    res.status(500).json({ error: 'Server error while filtering tailors.' });
  }
};


module.exports = {
  registerTailor,
  getAllTailors,
  getTailorById,
  getTailorsByGender
};

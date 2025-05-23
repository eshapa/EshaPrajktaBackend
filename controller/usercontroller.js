const User = require('../Models/usermodels');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    const { name, gender, phone, email, password, city } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      gender,
      phone,
      email,
      password: hashedPassword,
      city
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: { name, email } });
  } catch (error) {
    console.error('Error in user registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser };

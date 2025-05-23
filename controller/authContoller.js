const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Controller for Step 1: Email Registration
exports.registerEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User with this email already exists" });
    }

    // Create a new user with just the email
    const newUser = new User({ email });
    await newUser.save();

    res.status(201).json({ msg: "Email registered successfully. Please provide other details." });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Controller for Step 2: Completing User Registration (Name & Password)
exports.registerDetails = async (req, res) => {
  const { email } = req.params;
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found, please register email first" });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user details
    user.name = name;
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: "User registration complete" });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

const TempEmail = require('../Models/TempEmail');

const saveTempEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const existing = await TempEmail.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: 'Email already saved temporarily' });
    }

    const tempEmail = new TempEmail({ email });
    await tempEmail.save();

    res.status(201).json({ message: 'Temporary email saved', email });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  saveTempEmail,
};

module.exports = (req, res, next) => {
    const {
        shopName,
        owner,
        email,
        password,
        confirmPassword,
        contact,
        location,
        businessLicense
    } = req.body;

    // Validate required fields
    if (!shopName || !owner || !email || !password || !confirmPassword || !contact || !location || !businessLicense) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if email is in a valid format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Check if contact number is valid
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contact)) {
        return res.status(400).json({ message: 'Invalid contact number.' });
    }

    next();
};

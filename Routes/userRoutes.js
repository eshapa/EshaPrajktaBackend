const express = require('express');
const { registerUser } = require('../controller/usercontroller');  // Import the correct function
const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

module.exports = router;

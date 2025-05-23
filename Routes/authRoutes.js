const express = require('express');
const { registerEmail, registerDetails } = require('../controllers/authController');
const router = express.Router();

// Route for Step 1: Register Email
router.post('/register-email', registerEmail);

// Route for Step 2: Complete Registration (Name & Password)
router.post('/register-details/:email', registerDetails);

module.exports = router;

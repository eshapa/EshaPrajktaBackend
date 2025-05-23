const express = require('express');
const { saveTempEmail } = require('../controller/tempEmailController');
const router = express.Router();

router.post('/save-email', saveTempEmail);

module.exports = router;

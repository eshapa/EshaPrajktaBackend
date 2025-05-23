const express = require('express');
const router = express.Router();
const shopController = require('../controller/shopController');
const validateShop = require('../Middleware/validateShop');

router.post('/register', validateShop, shopController.registerShop);
router.get('/all', shopController.getAllShops); // ✅ This now works because it's defined

module.exports = router;

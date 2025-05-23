const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controller/orderController');

router.post('/', createOrder);
router.get('/', getOrders);

module.exports = router;

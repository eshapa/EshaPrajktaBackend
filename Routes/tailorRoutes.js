const express = require('express');
const router = express.Router();
const {
  registerTailor,
  getAllTailors,
  getTailorById,
  getTailorsByGender
} = require('../controller/tailorController');

// Routes
router.post('/register', registerTailor);                // POST /api/tailors/register
router.get('/', getAllTailors);                          // GET /api/tailors
router.get('/:id', getTailorById);                       // GET /api/tailors/:id
router.get('/gender/:gender', getTailorsByGender);       // GET /api/tailors/gender/Male or Female

module.exports = router;

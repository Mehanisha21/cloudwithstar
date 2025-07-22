const express = require('express');
const router = express.Router();
const poController = require('../controllers/poController');

// Route: GET /api/pos
router.get('/po/:Lifnr', poController.getPOByVendor);


module.exports = router;
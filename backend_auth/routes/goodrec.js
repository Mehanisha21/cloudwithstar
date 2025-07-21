const express = require('express');
const router = express.Router();

// Import the controller
const goodrecController = require('../controllers/goodrecController');

// Route: GET all goods receipts (no filter)
router.get('/goods-receipt', goodrecController.getAllGoodsReceipts);



module.exports = router;

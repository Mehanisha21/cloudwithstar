const express = require('express');
const router = express.Router();

// Import the controller
const memoController = require('../controllers/cdmemoController');

// Route to get credit/debit memos by Vendor ID (LIFNR)
router.get('/memos/:lifnr', memoController.getCreditDebitMemos);

module.exports = router;
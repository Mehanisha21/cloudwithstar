// routes/memo.js
const express = require('express');
const router = express.Router();

const cdmemoController = require('../controllers/cdmemoController');

// Route: GET /api/memo/:lifnr
router.get('/:lifnr', cdmemoController.getCDMemoByVendor);

module.exports = router;

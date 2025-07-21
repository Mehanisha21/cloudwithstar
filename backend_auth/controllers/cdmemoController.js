// controllers/cdmemoController.js
require('dotenv').config();
const axios = require('axios');
const https = require('https');

// SAP configuration from .env
const SAP_BASE_URL = process.env.SAP_BASE_URL;
const SAP_SERVICE = '/sap/opu/odata/SAP/ZMM_VENDOR_ODATA_PORTAL_SRV';
const SAP_CREDS = {
  username: process.env.AUTH_USER,
  password: process.env.AUTH_PASS
};

// Disable SSL verification (only for development/test)
const sapAgent = new https.Agent({ rejectUnauthorized: false });

/**
 * GET Credit/Debit Memo Data by Lifnr (Vendor ID)
 * Route: GET /api/memo/:lifnr
 */
exports.getCDMemoByVendor = async (req, res) => {
  const lifnr = req.params.lifnr;

  if (!lifnr) {
    return res.status(400).json({ success: false, message: 'lifnr is required' });
  }

  const cdmemoUrl = `${SAP_BASE_URL}${SAP_SERVICE}/ZVEN_CDMEMOSet?$filter=Lifnr eq '${lifnr}'&$format=json`;

  console.log('📡 SAP CD Memo URL:', cdmemoUrl);

  try {
    const response = await axios.get(cdmemoUrl, {
      headers: {
        Authorization:
          'Basic ' + Buffer.from(`${SAP_CREDS.username}:${SAP_CREDS.password}`).toString('base64'),
        Accept: 'application/json'
      },
      httpsAgent: sapAgent
    });

    const cdmemoData = response.data?.d?.results;

    res.json({
      success: true,
      data: cdmemoData
    });

  } catch (error) {
    console.error('❌ Error fetching CD Memo data:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: 'Failed to fetch Credit/Debit Memo data',
      error: error.message,
      details: error.response?.data
    });
  }
};

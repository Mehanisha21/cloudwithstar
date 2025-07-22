const axios = require('axios');
const https = require('https');

// SAP OData Config
const SAP_BASE_URL = process.env.SAP_BASE_URL; // e.g., http://azktlds5cp.kcloud.com:8000
const SAP_SERVICE = '/sap/opu/odata/SAP/ZMM_VENDOR_ODATA_PORTAL_SRV';
const SAP_CREDS = {
  username: process.env.AUTH_USER,
  password: process.env.AUTH_PASS
};

// SSL Agent (for self-signed certificates, if applicable)
const sapAgent = new https.Agent({ rejectUnauthorized: false });

// GET All Goods Receipts
exports.getAllGoodsReceipts = async (req, res) => {
  const goodsUrl = `${SAP_BASE_URL}${SAP_SERVICE}/VEN_GOODSRECSet?$format=json`;

  try {
    const response = await axios.get(goodsUrl, {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${SAP_CREDS.username}:${SAP_CREDS.password}`).toString('base64'),
        Accept: 'application/json'
      },
      httpsAgent: sapAgent
    });

    const goodsReceipts = response.data.d?.results || [];
    res.json(goodsReceipts);
  } catch (error) {
    console.error('❌ SAP Fetch Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch goods receipts from SAP' });
  }
};

const axios = require('axios');
const https = require('https');

// SAP OData Configuration
const SAP_BASE_URL = process.env.SAP_BASE_URL; // Example: http://azktlds5cp.kcloud.com:8000
const SAP_SERVICE_PATH = '/sap/opu/odata/SAP/ZMM_VENDOR_ODATA_PORTAL_SRV';
const SAP_CREDS = {
  username: process.env.AUTH_USER,
  password: process.env.AUTH_PASS
};

// SSL Agent (for self-signed certs)
const sapAgent = new https.Agent({ rejectUnauthorized: false });

// GET Credit/Debit Memos by Vendor ID (LIFNR)
exports.getCreditDebitMemos = async (req, res) => {
  const lifnr = req.params.lifnr; // e.g. '0000100000'
  const url = `${SAP_BASE_URL}${SAP_SERVICE_PATH}/VEN_CDSet?$filter=Lifnr eq '${lifnr}'&$format=json`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${SAP_CREDS.username}:${SAP_CREDS.password}`).toString('base64'),
        Accept: 'application/json'
      },
      httpsAgent: sapAgent
    });

    const results = response.data.d?.results || [];
    res.status(200).json(results);

  } catch (error) {
    console.error('❌ SAP Fetch Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch Credit/Debit Memos from SAP' });
  }
};

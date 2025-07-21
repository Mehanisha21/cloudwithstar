const axios = require('axios');
const https = require('https');

// SAP OData Config
const SAP_BASE_URL = process.env.SAP_BASE_URL;
const SAP_SERVICE = '/sap/opu/odata/SAP/ZMM_VENDOR_ODATA_PORTAL_SRV';
const SAP_CREDS = {
  username: process.env.AUTH_USER,
  password: process.env.AUTH_PASS
};

// SSL Agent for self-signed certificates (optional)
const sapAgent = new https.Agent({ rejectUnauthorized: false });

exports.getPOByVendor = async (req, res) => {
  const Lifnr = req.params.Lifnr;

  if (!Lifnr) {
    return res.status(400).json({ success: false, message: 'Lifnr is required' });
  }

  const poUrl = `${SAP_BASE_URL}${SAP_SERVICE}/VEN_POSet?$filter=Lifnr eq '${Lifnr}'&$format=json`;
  console.log('🔍 SAP PO URL:', poUrl);

  try {
    const response = await axios.get(poUrl, {
      headers: {
        Authorization:
          'Basic ' + Buffer.from(`${SAP_CREDS.username}:${SAP_CREDS.password}`).toString('base64'),
        Accept: 'application/json'
      },
      httpsAgent: sapAgent
    });

    const purchaseOrders = response.data.d.results;
    res.json(purchaseOrders);
  } catch (error) {
    if (error.response) {
      console.error('SAP responded with error:', error.response.status, error.response.statusText);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error('No response received from SAP:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }

    res.status(500).json({ error: 'Failed to retrieve purchase orders from SAP' });
  }
};

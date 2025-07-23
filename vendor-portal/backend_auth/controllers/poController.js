// controllers/poController.js
const axios = require('axios');
const https = require('https');

// SAP OData Config
// Ensure these environment variables are correctly set in your .env file
const SAP_BASE_URL = process.env.SAP_BASE_URL;
const SAP_SERVICE = '/sap/opu/odata/SAP/ZMM_VENDOR_ODATA_PORTAL_SRV';
const SAP_CREDS = {
  username: process.env.AUTH_USER,
  password: process.env.AUTH_PASS
};

// SSL Agent for self-signed certificates (optional, but good for dev)
const sapAgent = new https.Agent({ rejectUnauthorized: false });

exports.getPOByVendor = async (req, res) => {
  const Lifnr = req.params.Lifnr;

  if (!Lifnr) {
    console.error('[poController] Error: Lifnr is missing in request parameters.');
    return res.status(400).json({ success: false, message: 'Lifnr is required' });
  }

  const poUrl = `${SAP_BASE_URL}${SAP_SERVICE}/VEN_POSet?$filter=Lifnr eq '${Lifnr}'&$format=json`;
  console.log('🔍 [poController] SAP PO URL:', poUrl); // Log the full URL being called to SAP

  try {
    const response = await axios.get(poUrl, {
      headers: {
        Authorization:
          'Basic ' + Buffer.from(`${SAP_CREDS.username}:${SAP_CREDS.password}`).toString('base64'),
        Accept: 'application/json'
      },
      httpsAgent: sapAgent // Use the custom agent for SSL
    });

    // Log the raw response data from SAP for debugging
    console.log('[poController] Raw SAP Response.data:', JSON.stringify(response.data, null, 2));

    // Extract the results. Check if 'd' and 'results' exist.
    const purchaseOrders = response.data && response.data.d && response.data.d.results
                           ? response.data.d.results
                           : []; // Default to empty array if path doesn't exist

    // Log the extracted purchase orders array before sending
    console.log('[poController] Extracted Purchase Orders (d.results):', purchaseOrders);

    // Send the response in the format { success: true, data: [...] }
    // This is a robust and common API response format that your Angular service can handle.
    res.status(200).json({ success: true, data: purchaseOrders });

  } catch (error) {
    // Detailed error logging from SAP response
    if (error.response) {
      console.error('[poController] SAP responded with error status:', error.response.status);
      console.error('[poController] SAP response data:', JSON.stringify(error.response.data, null, 2));
      res.status(error.response.status).json({
        success: false,
        message: `SAP API Error: ${error.response.statusText || 'Unknown'}`,
        details: error.response.data || {}
      });
    } else if (error.request) {
      console.error('[poController] No response received from SAP (network error):', error.message);
      res.status(503).json({ success: false, message: 'No response from SAP server. Check network or SAP availability.' });
    } else {
      console.error('[poController] Error setting up request to SAP:', error.message);
      res.status(500).json({ success: false, message: 'Internal Server Error: Failed to setup request to SAP.' });
    }
  }
};

const axios = require('axios');
const xml2js = require('xml2js');
const https = require('https');

const SAP_BASE_URL = process.env.SAP_BASE_URL;
const SAP_SERVICE = '/sap/opu/odata/SAP/ZMM_VENDOR_ODATA_PORTAL_SRV';
const SAP_CREDS = {
  username: process.env.AUTH_USER,
  password: process.env.AUTH_PASS
};

const sapAgent = new https.Agent({ rejectUnauthorized: false });

exports.loginUser = async (req, res) => {
  const { vendorId, vendorPassword } = req.body;
  console.log('📡 POST /api/login hit');
  console.log('📥 Incoming body:', req.body);

  if (!vendorId || !vendorPassword) {
    return res.status(400).json({ success: false, message: 'vendorId and vendorPassword are required.' });
  }

  const loginUrl = `${SAP_BASE_URL}${SAP_SERVICE}/ZLOGIN_AUTHSet(VendorId='${vendorId}',VendorPwd='${vendorPassword}')`;
  console.log('🔍 SAP Request URL:', loginUrl);
  
  try {
    console.log('🔗 Hitting SAP login URL:', loginUrl);
    console.log('🛡️ Using credentials:', SAP_CREDS.username);

    const sapResponse = await axios.get(loginUrl, {
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${SAP_CREDS.username}:${SAP_CREDS.password}`).toString('base64'),
        Accept: 'application/xml'
      },
      httpsAgent: sapAgent
    });

    const xml = sapResponse.data;
    const parsed = await xml2js.parseStringPromise(xml, { explicitArray: false });
    const props = parsed?.entry?.content?.['m:properties'];
    const status = props?.['d:Status'] || 'Unknown';

    res.json({
      success: true,
      data: {
        vendorId,
        message: status
      }
    });
  } catch (error) {
    console.error('❌ SAP Error:', error.message);
    console.error('🔍 SAP Response:', error.response?.data || 'No response body');
    res.status(error.response?.status || 500).json({
      success: false,
      message: 'SAP login failed',
      error: error.message,
      details: error.response?.data
    });
  }
};
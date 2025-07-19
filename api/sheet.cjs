const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// รองรับทั้ง Render (env) และ local (require)
let key;
if (process.env.GOOGLE_SERVICE_ACCOUNT) {
  key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
} else {
  key = require('../service-account.json');
}
const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
  credentials: key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

app.post('/api/append', async (req, res) => {
  try {
    const client = await auth.getClient();
    const spreadsheetId = '1hawajq8eivRVMm4tm7uVINLSXbG_tW5QCEV4QYK5sCw'; // Spreadsheet ID ที่ผู้ใช้ให้มา
    const range = 'OKประจำวัน'; // ใช้ชื่อชีตตรงกับใน Google Sheet
    const values = req.body.values; // ตัวอย่าง: ['2025-07-19', 'ภาณุวัฒน์', ...]
    await sheets.spreadsheets.values.append({
      auth: client,
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [values] },
    });
    res.json({ status: 'success' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/latest-ok', async (req, res) => {
  try {
    const client = await auth.getClient();
    const spreadsheetId = '1hawajq8eivRVMm4tm7uVINLSXbG_tW5QCEV4QYK5sCw';
    const range = 'OKประจำวัน';
    const result = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId,
      range,
    });
    const rows = result.data.values;
    if (!rows || rows.length < 2) {
      return res.json({ latest: null });
    }
    const header = rows[0];
    const latest = rows[rows.length - 1];
    res.json({ header, latest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/monthly-ok', async (req, res) => {
  try {
    const client = await auth.getClient();
    const spreadsheetId = '1hawajq8eivRVMm4tm7uVINLSXbG_tW5QCEV4QYK5sCw';
    const range = 'OKประจำวัน';
    const result = await sheets.spreadsheets.values.get({
      auth: client,
      spreadsheetId,
      range,
    });
    const rows = result.data.values;
    if (!rows || rows.length < 2) {
      return res.json({ header: [], data: [] });
    }
    const header = rows[0];
    const data = rows.slice(1); // ข้าม header
    res.json({ header, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log('API running on port 3001')); 
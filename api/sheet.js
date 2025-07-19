const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const key = require('../service-account.json'); // path ไปยังไฟล์ service account
const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
  credentials: key,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

app.post('/api/append', async (req, res) => {
  try {
    const client = await auth.getClient();
    const spreadsheetId = '1hawajq8eivRVMm4tm7uVINLSXbG_tW5QCEV4QYK5sCw'; // Spreadsheet ID ที่ผู้ใช้ให้มา
    const range = 'Sheet1!A1:Z1'; // หรือชื่อชีตที่ต้องการ
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

app.listen(3001, () => console.log('API running on port 3001')); 
import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
  const sheets = google.sheets('v4');
  const auth = new google.auth.GoogleAuth({
    credentials: key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

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
} 
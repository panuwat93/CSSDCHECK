import React, { useState } from 'react';
import {
  Container, Typography, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem, InputLabel, FormControl, Stack, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

const CHECKERS = [
  'ภาณุวัฒน์',
  'สุกัญญา',
  'ณัชชกา',
  'ดวงแก้ว',
  'อรอุษา',
  'อัมพร',
];

const ITEMS = [
  { name: 'Ambu เด็กเล็ก', stock: 1 },
  { name: 'Ambu เด็กโต', stock: 1 },
  { name: 'Ambu ผู้ใหญ่', stock: 11 },
  { name: 'กรรไกรตัดไหม', stock: 5 },
  { name: 'กรรไกรตัดเนื้อ', stock: 5 },
  { name: 'ไม้กดลิ้น', stock: 2 },
  { name: 'Artery clamp โค้ง', stock: 2 },
  { name: 'Artery clamp ตรง', stock: 2 },
  { name: 'ด้ามมีด', stock: 1 },
  { name: 'Needle Holder', stock: 1 },
  { name: 'Off staple', stock: 1 },
  { name: 'Set H/C', stock: 6 },
  { name: 'Syringe Feed', stock: 30 },
  { name: 'Set เจาะปอด', stock: 2 },
  { name: 'Set Cut Down', stock: 3 },
  { name: 'Set Arrigate', stock: 3 },
  { name: 'Set Dressing', stock: 15 },
  { name: 'Set Suture Ward', stock: 1 },
  { name: 'Set เก็บดวงตา', stock: 1 },
  { name: 'Set Flush', stock: 22 },
  { name: 'Set สวนปัสสาวะ', stock: 2 },
  { name: 'ผ้า 180 วัน', stock: 1 },
  { name: 'ผ้าเจาะกลาง', stock: 3 },
  { name: 'ถาดเล็ก', stock: 1 },
  { name: 'กาวน์ Sterile', stock: 3 },
  { name: 'Tray', stock: 1 },
  { name: 'ขวด ICD', stock: 9 },
  { name: 'ชุดต่อ ICD 1 ขวด', stock: 2 },
  { name: 'ชุดต่อ ICD 2 ขวด', stock: 4 },
  { name: 'ชุดต่อ ICD 3 ขวด', stock: 4 },
];

export default function DailyCheck() {
  const navigate = useNavigate();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [checker, setChecker] = useState('');
  const [rows, setRows] = useState(
    ITEMS.map(item => ({ ...item, count: '', expire: '' }))
  );
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: 'success', message: '' });

  const handleCountChange = (idx, value) => {
    const newRows = [...rows];
    newRows[idx].count = value.replace(/\D/, '');
    setRows(newRows);
  };
  const handleExpireChange = (idx, value) => {
    const newRows = [...rows];
    newRows[idx].expire = value;
    setRows(newRows);
  };

  const getStatusColor = (stock, count) => {
    if (count === '') return 'inherit';
    const n = Number(count);
    if (n < stock) return 'warning.main';
    if (n === stock) return 'success.main';
    if (n > stock) return 'error.main';
    return 'inherit';
  };

  const handleSave = async () => {
    setSaving(true);
    // เตรียมข้อมูลส่งไป backend
    const values = [date, checker, ...rows.flatMap(row => [row.count, row.expire || 'no'])];
    try {
      const res = await fetch('http://localhost:3001/api/append', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values }),
      });
      const data = await res.json();
      if (data.status === 'success') {
        setAlert({ open: true, type: 'success', message: 'บันทึกข้อมูลสำเร็จ!' });
        // ล้างฟอร์มหลังบันทึกสำเร็จ
        setChecker('');
        setRows(ITEMS.map(item => ({ ...item, count: '', expire: '' })));
      } else {
        setAlert({ open: true, type: 'error', message: data.error || 'เกิดข้อผิดพลาด' });
      }
    } catch (err) {
      setAlert({ open: true, type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2, color: '#fff', fontWeight: 700, fontSize: 20, px: 4, py: 1.2, borderRadius: 6, background: 'linear-gradient(90deg, #7C3AED 0%, #42a5f5 100%)', boxShadow: '0 2px 8px rgba(124,58,237,0.10)', '&:hover': { background: 'linear-gradient(90deg, #42a5f5 0%, #7C3AED 100%)', boxShadow: '0 4px 16px rgba(124,58,237,0.18)' } }}>
        กลับเมนูหลัก
      </Button>
      <Paper sx={{ p: 3, borderRadius: 0, mb: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mb={2}>
          <TextField
            label="วันที่ตรวจสอบ"
            type="date"
            size="small"
            value={date}
            onChange={e => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 160 }}
          />
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="checker-label">
              <PersonIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              ชื่อผู้ตรวจสอบ *
            </InputLabel>
            <Select
              labelId="checker-label"
              value={checker}
              label={<><PersonIcon sx={{ verticalAlign: 'middle', mr: 1 }} />ชื่อผู้ตรวจสอบ *</>}
              onChange={e => setChecker(e.target.value)}
            >
              {CHECKERS.map(name => (
                <MenuItem key={name} value={name}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            mt: 1,
            borderRadius: 12,
            fontWeight: 600,
            color: '#fff',
            background: 'linear-gradient(90deg, #7C3AED 0%, #42a5f5 100%)',
            '&.Mui-disabled': {
              color: '#fff',
              background: 'linear-gradient(90deg, #7C3AED 0%, #42a5f5 100%)',
              opacity: 0.5,
            },
          }}
          fullWidth
          disabled={saving || !checker || rows.some(r => r.count === '')}
          onClick={handleSave}
        >
          {saving ? 'กำลังบันทึก...' : 'บันทึกลง GOOGLE SHEET'}
        </Button>
      </Paper>
      <TableContainer component={Paper} sx={{ width: '100%', boxShadow: 0, borderRadius: 0 }}>
        <Table stickyHeader size="small" sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: 15, px: 1 }}>ชื่ออุปกรณ์</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: 15, px: 1, width: 40 }}>Stock</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: 15, px: 1, width: 60 }}>นับ</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: 15, px: 1, width: 60 }}>หมดอายุ</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: 15, px: 1, width: 40 }}>สถานะ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={row.name}>
                <TableCell sx={{ fontSize: 14, px: 1 }}>{row.name}</TableCell>
                <TableCell align="center" sx={{ fontSize: 14, fontWeight: 600, px: 1 }}>{row.stock}</TableCell>
                <TableCell align="center" sx={{ px: 1 }}>
                  <TextField
                    value={row.count}
                    onChange={e => handleCountChange(idx, e.target.value)}
                    size="small"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', style: { textAlign: 'center', width: 40, fontSize: 15, padding: 2 } }}
                    sx={{ width: 48 }}
                  />
                </TableCell>
                <TableCell align="center" sx={{ px: 1 }}>
                  <FormControl size="small" sx={{ minWidth: 40 }}>
                    <Select
                      value={row.expire}
                      onChange={e => handleExpireChange(idx, e.target.value)}
                      displayEmpty
                      sx={{ fontSize: 15 }}
                    >
                      <MenuItem value="">-</MenuItem>
                      <MenuItem value="มี">มี</MenuItem>
                      <MenuItem value="ไม่มี">ไม่มี</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="center" sx={{ px: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      mx: 'auto',
                      bgcolor: getStatusColor(row.stock, row.count),
                      border: '1.5px solid #bdbdbd',
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
} 
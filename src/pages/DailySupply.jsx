import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, CircularProgress, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

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

export default function DailySupply() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLatest = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/latest-ok');
        const data = await res.json();
        if (!data.latest) {
          setRows([]);
          setError('ไม่พบข้อมูลล่าสุด');
        } else {
          // data.latest: [date, checker, ...count, expire, count, expire, ...]
          // map count ตาม ITEMS
          const counts = [];
          let i = 2; // ข้ามวันที่/ชื่อผู้ตรวจสอบ
          for (const item of ITEMS) {
            const ok = Number(data.latest[i]) || 0;
            const need = ok < item.stock ? item.stock - ok : 0;
            counts.push({ ...item, ok, need });
            i += 2; // ข้าม count, expire
          }
          setRows(counts);
        }
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
        setRows([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2, color: '#fff', fontWeight: 700, fontSize: 20, px: 4, py: 1.2, borderRadius: 6, background: 'linear-gradient(90deg, #7C3AED 0%, #42a5f5 100%)', boxShadow: '0 2px 8px rgba(124,58,237,0.10)', '&:hover': { background: 'linear-gradient(90deg, #42a5f5 0%, #7C3AED 100%)', boxShadow: '0 4px 16px rgba(124,58,237,0.18)' } }}>
        กลับเมนูหลัก
      </Button>
      <Paper sx={{ p: 3, borderRadius: 4, mb: 2, boxShadow: 2 }}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 800, mb: 2, color: 'primary.main' }}>
          รายการแลกประจำวัน
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>ชื่ออุปกรณ์</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, fontSize: 16 }}>จำนวน Stock</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, fontSize: 16 }}>จำนวนที่ OK</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, fontSize: 16 }}>จำนวนที่ต้องแลก</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, idx) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="center">{row.stock}</TableCell>
                    <TableCell align="center">{row.ok}</TableCell>
                    <TableCell align="center" sx={{ color: row.need > 0 ? 'error.main' : 'success.main', fontWeight: 700 }}>
                      {row.need > 0 ? row.need : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
} 
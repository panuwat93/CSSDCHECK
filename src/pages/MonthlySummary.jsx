import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Box, MenuItem, Select, FormControl, InputLabel, CircularProgress, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

export default function MonthlySummary() {
  const navigate = useNavigate();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMonthly = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/monthly-ok');
        const data = await res.json();
        if (!data.data || data.data.length === 0) {
          setRows([]);
          setError('ไม่พบข้อมูลในเดือนนี้');
        } else {
          // data.data: [ [date, checker, ...], ... ]
          const days = getDaysInMonth(year, month);
          const summary = [];
          for (let d = 1; d <= days; d++) {
            const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const found = data.data.find(row => row[0] && row[0].startsWith(dateStr));
            summary.push({
              date: dateStr,
              checker: found ? (found[1] || '') : '',
            });
          }
          setRows(summary);
        }
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
        setRows([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMonthly();
  }, [year, month]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mb: 2, color: '#fff', fontWeight: 700, fontSize: 20, px: 4, py: 1.2, borderRadius: 6, background: 'linear-gradient(90deg, #7C3AED 0%, #42a5f5 100%)', boxShadow: '0 2px 8px rgba(124,58,237,0.10)', '&:hover': { background: 'linear-gradient(90deg, #42a5f5 0%, #7C3AED 100%)', boxShadow: '0 4px 16px rgba(124,58,237,0.18)' } }}>
        กลับเมนูหลัก
      </Button>
      <Paper sx={{ p: 3, borderRadius: 4, mb: 2, boxShadow: 2 }}>
        <Typography variant="h5" align="center" sx={{ fontWeight: 800, mb: 2, color: 'primary.main' }}>
          สรุปประจำเดือน
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, justifyContent: 'center' }}>
          <FormControl size="small">
            <InputLabel>เดือน</InputLabel>
            <Select value={month} label="เดือน" onChange={e => setMonth(Number(e.target.value))}>
              {[...Array(12)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small">
            <InputLabel>ปี</InputLabel>
            <Select value={year} label="ปี" onChange={e => setYear(Number(e.target.value))}>
              {[year - 1, year, year + 1].map(y => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
                  <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>วันที่</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: 16 }}>ผู้ตรวจสอบ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, idx) => (
                  <TableRow key={row.date} sx={row.checker ? {} : { background: '#ffeaea' }}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell sx={{ color: row.checker ? 'success.main' : 'error.main', fontWeight: 700 }}>
                      {row.checker || 'ไม่มีผู้ตรวจสอบ'}
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
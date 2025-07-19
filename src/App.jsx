import React from 'react';
import { Box, Container, Typography, Card, CardContent, Button, Stack, useTheme } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import DailyCheck from './pages/DailyCheck';
import DailySupply from './pages/DailySupply';
import MonthlySummary from './pages/MonthlySummary';
import logo from './assets/icon-512x512.png';

function MainMenu() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" sx={{ py: 6, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Card
        sx={{
          mb: 5,
          borderRadius: 6,
          boxShadow: '0 8px 32px 0 rgba(21,101,192,0.10)',
          background: 'linear-gradient(135deg, #e3f0ff 0%, #f7fafd 100%)',
          animation: 'fadein 1s',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <img src={logo} alt="โลโก้" style={{ height: 151, width: 151, borderRadius: 16, boxShadow: '0 2px 8px #90caf9' }} />
          </Box>
          {/* <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 800, fontFamily: 'Kanit', letterSpacing: 1, color: '#1565c0', textShadow: '0 2px 8px #90caf9' }}>
            OK Check อุปกรณ์เวรตู้
          </Typography> */}
          <Typography align="center" color="text.secondary" sx={{ fontSize: 22, fontWeight: 700, mb: 1 }}>
            ระบบตรวจเช็คและบันทึกอุปกรณ์ประจำวัน
          </Typography>
        </CardContent>
      </Card>
      <Stack spacing={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<CheckCircleIcon sx={{ fontSize: 32 }} />}
          sx={{
            borderRadius: 6,
            py: 2.2,
            fontSize: 24,
            fontWeight: 700,
            color: '#fff',
            background: 'linear-gradient(90deg, #7C3AED 0%, #42a5f5 100%)',
            boxShadow: '0 4px 24px 0 rgba(124,58,237,0.15)',
            transition: 'all 0.2s',
            '&:hover': {
              background: 'linear-gradient(90deg, #42a5f5 0%, #7C3AED 100%)',
              transform: 'scale(1.04)',
              boxShadow: '0 8px 32px 0 rgba(124,58,237,0.18)',
            },
            animation: 'fadein 1.2s',
          }}
          fullWidth
          onClick={() => navigate('/daily-check')}
        >
          OK ของประจำวัน
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Inventory2Icon sx={{ fontSize: 32 }} />}
          sx={{
            borderRadius: 6,
            py: 2.2,
            fontSize: 24,
            fontWeight: 700,
            color: '#fff',
            background: 'linear-gradient(90deg, #7C3AED 0%, #42a5f5 100%)',
            boxShadow: '0 4px 24px 0 rgba(124,58,237,0.15)',
            transition: 'all 0.2s',
            '&:hover': {
              background: 'linear-gradient(90deg, #42a5f5 0%, #7C3AED 100%)',
              transform: 'scale(1.04)',
              boxShadow: '0 8px 32px 0 rgba(124,58,237,0.18)',
            },
            animation: 'fadein 1.4s',
          }}
          fullWidth
          onClick={() => navigate('/daily-supply')}
        >
          รายการแลกประจำวัน
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<CalendarMonthIcon sx={{ fontSize: 32 }} />}
          sx={{
            borderRadius: 6,
            py: 2.2,
            fontSize: 24,
            fontWeight: 700,
            color: '#fff',
            background: 'linear-gradient(90deg, #7C3AED 0%, #42a5f5 100%)',
            boxShadow: '0 4px 24px 0 rgba(124,58,237,0.15)',
            transition: 'all 0.2s',
            '&:hover': {
              background: 'linear-gradient(90deg, #42a5f5 0%, #7C3AED 100%)',
              transform: 'scale(1.04)',
              boxShadow: '0 8px 32px 0 rgba(124,58,237,0.18)',
            },
            animation: 'fadein 1.6s',
          }}
          fullWidth
          onClick={() => navigate('/monthly-summary')}
        >
          สรุปประจำเดือน
        </Button>
      </Stack>
      <style>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </Container>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/daily-check" element={<DailyCheck />} />
        <Route path="/daily-supply" element={<DailySupply />} />
        <Route path="/monthly-summary" element={<MonthlySummary />} />
      </Routes>
    </Router>
  );
}

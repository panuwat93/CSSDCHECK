import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Kanit, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: '#7C3AED', // ม่วงสด
      contrastText: '#fff',
    },
    secondary: {
      main: '#42a5f5', // ฟ้าสด
      contrastText: '#fff',
    },
    background: {
      default: '#f3f0fa', // ม่วงอ่อนมาก
      paper: '#f7fafd', // ฟ้าอ่อน
    },
    success: {
      main: '#43a047',
      contrastText: '#fff',
    },
    warning: {
      main: '#ffb300',
      contrastText: '#fff',
    },
    error: {
      main: '#e53935',
      contrastText: '#fff',
    },
    info: {
      main: '#1976d2',
      contrastText: '#fff',
    },
    grey: {
      100: '#f7fafd',
      200: '#e3e8ee',
      300: '#bdbdbd',
      400: '#9e9e9e',
      500: '#757575',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          fontWeight: 600,
          fontSize: '1.1rem',
          boxShadow: '0 2px 8px rgba(124,58,237,0.10)',
          padding: '10px 28px',
          textTransform: 'none',
          transition: 'all 0.2s',
          background: 'linear-gradient(90deg, #7C3AED 0%, #42a5f5 100%)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(124,58,237,0.18)',
            background: 'linear-gradient(90deg, #42a5f5 0%, #7C3AED 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(124,58,237,0.10)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 12px rgba(124,58,237,0.08)',
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          background: 'linear-gradient(90deg, #ede7f6 0%, #bbdefb 100%)', // ม่วงอ่อน-ฟ้าอ่อน
          fontWeight: 700,
          fontSize: 16,
        },
        root: {
          fontSize: 15,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme; 
import { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';

const ThemeContext = createContext();

// Light Theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4F46E5', // Indigo
      light: '#818CF8',
      dark: '#3730A3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#06B6D4', // Cyan
      light: '#67E8F9',
      dark: '#0891B2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#F9FAFB',
      paper: '#ffffff',
    },
    text: {
      primary: '#2d1b69', // Deep twilight purple
      secondary: '#7b6897', // Muted twilight purple
    },
    divider: 'rgba(124, 77, 255, 0.12)', // Purple with opacity
    action: {
      active: '#7c4dff',
      hover: 'rgba(124, 77, 255, 0.04)',
      selected: 'rgba(124, 77, 255, 0.08)',
      disabled: 'rgba(124, 77, 255, 0.26)',
      disabledBackground: 'rgba(124, 77, 255, 0.12)',
    },
    error: {
      main: '#ff5d8f', // Sunset pink
      light: '#ff8fb6',
      dark: '#c62c6b',
    },
    warning: {
      main: '#ffab70', // Sunset orange
      light: '#ffcd9f',
      dark: '#c67b43',
    },
    info: {
      main: '#64b5f6', // Twilight blue
      light: '#9be7ff',
      dark: '#2286c3',
    },
    success: {
      main: '#69f0ae', // Twilight mint
      light: '#9fffe0',
      dark: '#2bbd7e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { color: '#2d1b69' },
    h2: { color: '#2d1b69' },
    h3: { color: '#2d1b69' },
    h4: { color: '#2d1b69' },
    h5: { color: '#2d1b69' },
    h6: { color: '#2d1b69' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          background: 'linear-gradient(45deg, #7c4dff, #ff6b9b)',
          '&:hover': {
            background: 'linear-gradient(45deg, #b47cff, #ff9ecb)',
            boxShadow: '0 2px 8px rgba(124, 77, 255, 0.25)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(124, 77, 255, 0.08)',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(124, 77, 255, 0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          color: '#2d1b69',
          boxShadow: '0 1px 3px rgba(124, 77, 255, 0.12)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        filled: {
          '&.MuiChip-colorPrimary': {
            background: 'linear-gradient(45deg, #7c4dff20, #ff6b9b20)',
            color: '#7c4dff',
          },
        },
      },
    },
  },
});

// Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#818CF8', // Lighter Indigo
      light: '#A5B4FC',
      dark: '#4F46E5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#22D3EE', // Lighter Cyan
      light: '#67E8F9',
      dark: '#06B6D4',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0F172A',
      paper: '#1E293B',
    },
    text: {
      primary: '#e6e0ff',
      secondary: '#b3a7d6',
    },
    divider: 'rgba(157, 132, 255, 0.12)',
    action: {
      active: '#9d84ff',
      hover: 'rgba(157, 132, 255, 0.08)',
      selected: 'rgba(157, 132, 255, 0.16)',
      disabled: 'rgba(157, 132, 255, 0.3)',
      disabledBackground: 'rgba(157, 132, 255, 0.12)',
    },
    error: {
      main: '#ff84b7',
      light: '#ffb6d9',
      dark: '#c95486',
    },
    warning: {
      main: '#ffc284',
      light: '#ffd4b6',
      dark: '#c99157',
    },
    info: {
      main: '#84b6ff',
      light: '#b6d4ff',
      dark: '#5785cb',
    },
    success: {
      main: '#84ffb7',
      light: '#b6ffd4',
      dark: '#57cb85',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          background: 'linear-gradient(45deg, #9d84ff, #ff84b7)',
          '&:hover': {
            background: 'linear-gradient(45deg, #cfb3ff, #ffb6d9)',
            boxShadow: '0 2px 8px rgba(157, 132, 255, 0.25)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'linear-gradient(145deg, #130c2c, #1a1040)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(19, 12, 44, 0.8)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        filled: {
          '&.MuiChip-colorPrimary': {
            background: 'linear-gradient(45deg, #9d84ff20, #ff84b720)',
            color: '#9d84ff',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export const CustomThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useCustomTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
};
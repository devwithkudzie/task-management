import React from 'react';
import { Box, useTheme } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';

const Logo = ({ size = 28 }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          borderRadius: '25%',
          transform: 'rotate(45deg)',
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': {
              transform: 'rotate(45deg) scale(1)',
            },
            '50%': {
              transform: 'rotate(45deg) scale(1.05)',
            },
            '100%': {
              transform: 'rotate(45deg) scale(1)',
            },
          },
        }}
      />
      <AutoAwesome
        sx={{
          color: 'white',
          fontSize: size * 0.6,
          position: 'relative',
          zIndex: 1,
        }}
      />
    </Box>
  );
};

export default Logo; 
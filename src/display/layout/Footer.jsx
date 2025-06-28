import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#f8fafc', // Slightly off-white
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '2px solid #e3eaf5',
        boxShadow: '0 -2px 8px rgba(25,118,210,0.04)',
        px: 2,
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}>
        {/* Optional accent icon, e.g., a small blue dot */}
        <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: '#1976d2', opacity: 0.15 }} />
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: '#222', // Dark text
          fontFamily: '"Poppins", sans-serif',
          fontSize: '15px',
          letterSpacing: 0.2,
        }}
      >
        © Ohav Shemesh Web Development
      </Typography>
    </Box>
  );
}

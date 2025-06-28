import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ROUTES from '../router/routesModule';

const Header = ({ navigate }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(90deg, #fff 80%, #eaf3ff 100%)',
        padding: '16px',
        height: '64px',
        overflow: 'hidden',
        boxShadow: '0 4px 16px 0 rgba(25, 118, 210, 0.07)',
        borderBottom: '1.5px solid #e3eaf5',
        borderRadius: '0 0 18px 18px',
      }}
    >
      {/* Empty box for left spacing (if needed) */}
      <Box sx={{ width: '36px' }} />

      {/* Centered Logo */}
      <img
        onClick={() => navigate(ROUTES.HOME)}
        src="/trimtimelogo.png"
        alt="TrimTime Logo"
        style={{
          height: '100%',
          width: 'auto',
          objectFit: "contain",
          display: 'block',
          transform: "scale(2.5)",
          cursor: "pointer"
        }}
      />


      {/* Calendar Icon and Text absolutely positioned to the right */}
      <Box
        sx={{
          position: 'absolute',
          right: 24,
          top: 0,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton
          sx={{
            transition: 'background 0.2s',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '&:hover': {
              background: '#eaf3ff',
            },
          }}
        >
          <Typography sx={{ fontSize: 16, color: '#222', fontWeight: 500 }}>
            תורים עתידיים
          </Typography>
          <CalendarMonthIcon sx={{ color: '#000', fontSize: '36px', transition: 'color 0.2s', '&:hover': { color: '#666' } }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;

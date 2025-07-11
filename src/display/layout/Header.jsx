import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ROUTES from '../router/routesModule';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ConnectionInput from '../../helpers/ConnectionInput';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Header = ({ navigate, isAdmin, setIsOpen, isOpen, handleSubmit, loginData, handleChange, isConnected, logout, connectedUser }) => {

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
      {isOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255,255,255,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: "auto",
            zIndex: 1300,
            px: 2,
            overflow: 'hidden',
          }}
          onClick={() => setIsOpen(false)}
        >
          <Box
            sx={{
              width: { xs: '100%', sm: '80%', md: '60%', lg: '40%', xl: '30%' },
              maxWidth: '500px',
              backgroundColor: '#fff',
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
              boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
              minHeight: 400,
            }}
            onClick={e => e.stopPropagation()}
          >

            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontWeight: 600,
                fontSize: { xs: "15px", sm: "16px", md: "17px" },
                color: "#111",
                mb: 2
              }}
            >
              הזן פרטים
            </Typography>
            <ConnectionInput isOpen={isOpen} setIsOpen={setIsOpen} handleChange={handleChange} loginData={loginData} handleSubmit={handleSubmit} />
          </Box>
        </Box>
      )}

      {/* Empty box for left spacing (if needed) */}
      <Box sx={{ width: '36px' }} />
      {!isConnected && <Box
        sx={{
          position: 'absolute',
          left: 24,
          top: 0,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton
          onClick={() => setIsOpen(true)}
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
          <AccountCircleIcon sx={{ color: '#000', fontSize: '36px', transition: 'color 0.2s', '&:hover': { color: '#666' } }} />
        </IconButton>
      </Box>}
      <Box sx={{ width: '36px' }} />
      {isConnected && <Box
        sx={{
          position: 'absolute',
          left: 24,
          top: 0,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton
          onClick={() => {
            logout()
            window.location.reload()
          }}
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
          <LogoutIcon sx={{ color: '#000', fontSize: '36px', transition: 'color 0.2s', '&:hover': { color: '#666' } }} />
        </IconButton>
      </Box>}

      {/* Centered Logo */}
      <img
        onClick={() => {
          navigate(ROUTES.HOME)
          window.location.reload()
        }}
        src={isAdmin ? "/trimtimelogoadmin.png" : "/trimtimelogo.png"}
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
        {isAdmin && <IconButton
          onClick={() => {
            navigate(ROUTES.ADMIN + `/${connectedUser.name}`)
            window.location.reload()
          }}
          sx={{
            transition: 'background 0.2s',
            borderRadius: '50%',
            '&:hover': {
              background: '#eaf3ff',
            },
            mr: 3
          }}
        >
          <AdminPanelSettingsIcon sx={{ color: '#000', fontSize: '36px', transition: 'color 0.2s', '&:hover': { color: '#666' } }} />
        </IconButton>}
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
            {isAdmin ? "תורים עתדיים (אדמין)" : "תורים עתידיים"}
          </Typography>
          <CalendarMonthIcon sx={{ color: '#000', fontSize: '36px', transition: 'color 0.2s', '&:hover': { color: '#666' } }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;

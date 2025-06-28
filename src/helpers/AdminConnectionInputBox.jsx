import { Box, Button, Input, InputLabel } from '@mui/material';
import React from 'react';
import useUsers from './hooks/useUsers';

export default function AdminConnectionInputBox({ setIsOpen, handleSubmit, handleChange, loginData }) {

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <Box sx={{ width: '100%', alignSelf: 'center', mb: 2, mt: 3 }}></Box>

            {/* Username Input */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mb: 3 }}>
                <InputLabel
                    sx={{
                        mb: 0.5,
                        color: "#000",
                        fontSize: { xs: "12px", sm: "13px" },
                        fontWeight: 400,
                        alignSelf: 'center',
                    }}
                >
                    שם משתמש
                </InputLabel>
                <Input
                    fullWidth
                    name="username"
                    value={loginData.username}
                    onChange={handleChange}
                    sx={{
                        direction: "rtl",
                        color: "#222",
                        fontSize: { xs: "13px", sm: "14px" },
                        background: '#fff',
                        borderRadius: '6px',
                        px: 1.5,
                        py: 1,
                        border: '1px solid lightgrey',
                        boxShadow: 'none',
                        '&:before': { borderBottom: 'none' },
                        '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                        '&:after': { borderBottom: '2px solid #000' },
                        transition: 'background 0.2s',
                        maxWidth: 350,
                        alignSelf: 'center',
                    }}
                />
            </Box>

            {/* Password Input */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mb: 3 }}>
                <InputLabel
                    sx={{
                        mb: 0.5,
                        color: "#000",
                        fontSize: { xs: "12px", sm: "13px" },
                        fontWeight: 400,
                        alignSelf: 'center',
                    }}
                >
                    סיסמא
                </InputLabel>
                <Input
                    fullWidth
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleChange}
                    sx={{
                        direction: "rtl",
                        color: "#222",
                        fontSize: { xs: "13px", sm: "14px" },
                        background: '#fff',
                        borderRadius: '6px',
                        px: 1.5,
                        py: 1,
                        border: '1px solid lightgrey',
                        boxShadow: 'none',
                        '&:before': { borderBottom: 'none' },
                        '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                        '&:after': { borderBottom: '2px solid #000' },
                        transition: 'background 0.2s',
                        maxWidth: 350,
                        alignSelf: 'center',
                    }}
                />
            </Box>

            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 3 }}>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                        mt: 2,
                        px: { xs: 3, sm: 4 },
                        py: { xs: 0.7, sm: 1 },
                        borderRadius: "7px",
                        fontWeight: 500,
                        fontSize: { xs: "13px", sm: "14px" },
                        backgroundColor: '#666',
                        color: '#fff',
                        boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
                        '&:hover': {
                            backgroundColor: '#000',
                        },
                    }}
                >
                    התחבר
                </Button>
            </Box>
        </Box>
    );
}

import { Box, Typography } from '@mui/material'
import React from 'react'

export default function BusinessBoard({ isUserConnected, isUserAdmin }) {

    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '100vh',
            px: { xs: 2, sm: 4, md: 6 },
            py: { xs: 5, sm: 7, md: 8 },
            overflow: 'hidden',
        }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    background: 'url(/background.png) center center',
                    backgroundSize: '200px',
                    backgroundRepeat: 'repeat',
                    opacity: 0.4,
                }}
            />
            <Box sx={{ position: "relative" }}>
                {!isUserConnected && !isUserAdmin && <Typography variant='h4'>Please Connect...</Typography>}
                {isUserConnected && !isUserAdmin && <Typography variant='h4'>You are not an admin, this is an admin only board!</Typography>}
                {isUserConnected && isUserAdmin && <Typography variant='h4'>You are an admin</Typography>}
            </Box>
        </Box>
    )
}

import { Box, Card, Typography } from '@mui/material'
import React from 'react'
import BusinessCard from '../../helpers/BusinessCard'

export default function HomePage({ businesses, navigateToBarberPage }) {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                width: "100%",
                height: "100vh",
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
            <Box sx={{ zIndex: 10, display: 'flex', flexDirection: 'column', gap: 5, width: '90%', height: '100%' }}>
                <Typography variant='h3' sx={{ textAlign: "center", fontFamily: 'arial', fontWeight: "bold", mt: 3 }}>
                    בחר עסק
                </Typography>
                <Box sx={{ display: 'flex', gap: 5 }}>
                    {businesses.map((business) => (
                        <Card sx={{ width: "33%", borderRadius: '20px' }}>
                            <BusinessCard key={business._id} business={business} navigateToBarberPage={navigateToBarberPage} />
                        </Card>
                    ))}
                </Box>
            </Box>

        </Box>
    );
}

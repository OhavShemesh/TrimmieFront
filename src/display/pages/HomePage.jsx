import { Box, Card, Typography, Button, Fab, useTheme, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import BusinessCard from '../../helpers/BusinessCard'
import MapIcon from '@mui/icons-material/Map'
import GridViewIcon from '@mui/icons-material/GridView'
import LocationOnIcon from '@mui/icons-material/LocationOn'

export default function HomePage({ businesses, navigateToBarberPage }) {
    const [showMap, setShowMap] = useState(false)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                width: "100%",
                minHeight: "100vh",
            }}
        >
            {/* Original background - exactly as it was */}
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

                {/* View Toggle Buttons */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'center',
                        mb: 2,
                        background: 'rgba(255,255,255,0.9)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '50px',
                        p: 1,
                        border: '1px solid rgba(0,0,0,0.1)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        width: 'fit-content',
                        alignSelf: 'center'
                    }}
                >
                    <Button
                        variant={!showMap ? "contained" : "outlined"}
                        startIcon={<GridViewIcon />}
                        onClick={() => setShowMap(false)}
                        sx={{
                            borderRadius: '25px',
                            px: 3,
                            py: 1,
                            fontWeight: 600,
                            fontSize: '14px',
                            ...(showMap ? {
                                color: '#666',
                                borderColor: 'rgba(0,0,0,0.2)',
                                '&:hover': {
                                    borderColor: '#333',
                                    backgroundColor: 'rgba(0,0,0,0.05)'
                                }
                            } : {
                                backgroundColor: '#667eea',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#5a6fd8'
                                }
                            })
                        }}
                    >
                        רשימת עסקים
                    </Button>
                    <Button
                        variant={showMap ? "contained" : "outlined"}
                        startIcon={<MapIcon />}
                        onClick={() => setShowMap(true)}
                        sx={{
                            borderRadius: '25px',
                            px: 3,
                            py: 1,
                            fontWeight: 600,
                            fontSize: '14px',
                            ...((!showMap) ? {
                                color: '#666',
                                borderColor: 'rgba(0,0,0,0.2)',
                                '&:hover': {
                                    borderColor: '#333',
                                    backgroundColor: 'rgba(0,0,0,0.05)'
                                }
                            } : {
                                backgroundColor: '#667eea',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#5a6fd8'
                                }
                            })
                        }}
                    >
                        מפת מיקומים
                    </Button>
                </Box>

                {!showMap ? (
                    // Business Cards - Enhanced but keeping original structure
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: 'repeat(2, 1fr)',
                                lg: 'repeat(3, 1fr)'
                            },
                            gap: { xs: 2, md: 3 },
                            justifyItems: 'center'
                        }}
                    >
                        {businesses.map((business, index) => (
                            <Card
                                key={business._id}
                                sx={{
                                    width: '100%',
                                    maxWidth: '400px',
                                    borderRadius: '24px',
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                    animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                                    '&:hover': {
                                        transform: 'translateY(-12px) scale(1.02)',
                                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                                        background: 'rgba(255, 255, 255, 1)',
                                    },
                                    '@keyframes slideInUp': {
                                        '0%': {
                                            opacity: 0,
                                            transform: 'translateY(60px)'
                                        },
                                        '100%': {
                                            opacity: 1,
                                            transform: 'translateY(0)'
                                        }
                                    }
                                }}
                            >
                                <BusinessCard
                                    business={business}
                                    navigateToBarberPage={navigateToBarberPage}
                                />
                            </Card>
                        ))}
                    </Box>
                ) : (
                    // Map Placeholder - Centered properly
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%'
                        }}
                    >
                        <Card
                            sx={{
                                width: '100%',
                                maxWidth: '800px',
                                height: '500px',
                                borderRadius: '24px',
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 3,
                                p: 4,
                                animation: 'fadeIn 0.5s ease-out',
                                '@keyframes fadeIn': {
                                    '0%': { opacity: 0 },
                                    '100%': { opacity: 1 }
                                }
                            }}
                        >
                            <LocationOnIcon
                                sx={{
                                    fontSize: 80,
                                    color: '#667eea',
                                    animation: 'pulse 2s ease-in-out infinite',
                                    '@keyframes pulse': {
                                        '0%, 100%': { opacity: 1 },
                                        '50%': { opacity: 0.6 }
                                    }
                                }}
                            />
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    color: '#333',
                                    textAlign: 'center'
                                }}
                            >
                                מפת מיקומים
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#666',
                                    textAlign: 'center',
                                    maxWidth: '400px',
                                    lineHeight: 1.6
                                }}
                            >
                                בקרוב תוכל לראות את כל הספרים על המפה ולמצוא את הקרוב ביותר אליך
                            </Typography>
                            <Box
                                sx={{
                                    width: '80%',
                                    height: '200px',
                                    background: 'linear-gradient(45deg, #f0f0f0, #e0e0e0)',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px dashed #ccc'
                                }}
                            >
                                <Typography variant="h6" sx={{ color: '#999' }}>
                                    מפה אינטראקטיבית - בקרוב
                                </Typography>
                            </Box>
                        </Card>
                    </Box>
                )}
            </Box>

            {/* Floating Action Button for Mobile */}
            {isMobile && (
                <Fab
                    onClick={() => setShowMap(!showMap)}
                    sx={{
                        position: 'fixed',
                        bottom: 24,
                        right: 24,
                        zIndex: 1000,
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        color: 'white',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #5a6fd8, #6a4190)',
                            transform: 'scale(1.1)'
                        },
                        transition: 'all 0.3s ease'
                    }}
                >
                    {showMap ? <GridViewIcon /> : <MapIcon />}
                </Fab>
            )}
        </Box>
    );
}
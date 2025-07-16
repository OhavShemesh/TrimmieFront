import React, { useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import InputBox from '../../helpers/InputBox';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default function BarberPage({
    dates,
    selectedDate,
    isOpen,
    setSelectedDate,
    setIsOpen,
    setShowAllDates,
    showAllDates,
    name,
    businesses,
    setSelectedTime,
    selectedTime,
    timeSlotsByDate,
    createAppointment,
    isCustomerValid,
    setAppointmentCreated,
}) {

    return (
        <Box
            sx={{
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
            {/* Background pattern - same as homepage */}
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

            {/* Header Section with modern styling */}
            <Box
                sx={{
                    position: 'relative',
                    mb: 6,
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    p: 4,
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    animation: 'slideInDown 0.6s ease-out',
                    '@keyframes slideInDown': {
                        '0%': {
                            opacity: 0,
                            transform: 'translateY(-30px)'
                        },
                        '100%': {
                            opacity: 1,
                            transform: 'translateY(0)'
                        }
                    }
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 800,
                        letterSpacing: "2px",
                        textAlign: "center",
                        mb: 2,
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                    variant='h3'
                >
                    ✂️ {name}
                </Typography>
                <Typography
                    sx={{
                        fontWeight: 500,
                        letterSpacing: "1px",
                        textAlign: "center",
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1
                    }}
                    variant='h6'
                >
                    <LocationPinIcon sx={{ color: '#667eea' }} />
                    {
                        businesses.find(business => business.name === name)
                            ? `${businesses.find(business => business.name === name).address.streetAddress}, ${businesses.find(business => business.name === name).address.city}`
                            : "Address not found"
                    }
                </Typography>
            </Box>

            {/* Overlay for closing date selection */}
            {selectedDate !== null && !isOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 10,
                        background: 'transparent',
                    }}
                    onClick={() => setSelectedDate(null)}
                />
            )}

            {/* Content container */}
            <Box sx={{ position: 'relative', width: '100%', maxWidth: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 11 }}>

                {/* 💈 Pricing Board - Enhanced */}
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 600,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                        p: { xs: 3, sm: 4 },
                        mb: 5,
                        textAlign: 'right',
                        direction: 'rtl',
                        animation: 'slideInUp 0.6s ease-out 0.2s both',
                        '@keyframes slideInUp': {
                            '0%': {
                                opacity: 0,
                                transform: 'translateY(30px)'
                            },
                            '100%': {
                                opacity: 1,
                                transform: 'translateY(0)'
                            }
                        }
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '20px', sm: '24px' },
                            mb: 3,
                            textAlign: 'center',
                            color: '#333',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1
                        }}
                    >
                        💰 מחירי שירותים
                    </Typography>

                    {[
                        { service: 'תספורת רגילה', price: '₪60', icon: '✂️' },
                        { service: 'עיצוב זקן', price: '₪40', icon: '🧔' },
                        { service: 'תספורת ילדים', price: '₪50', icon: '👶' },
                        { service: 'צבע / החלקה', price: '₪150+', icon: '🎨' },
                    ].map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: index !== 3 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                                py: 2,
                                px: 1,
                                transition: 'all 0.3s ease',
                                borderRadius: '12px',
                                mb: index !== 3 ? 1 : 0,
                                '&:hover': {
                                    backgroundColor: 'rgba(102, 126, 234, 0.05)',
                                    transform: 'translateX(-5px)'
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography sx={{ fontSize: '20px' }}>{item.icon}</Typography>
                                <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>{item.service}</Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#667eea' }}>{item.price}</Typography>
                        </Box>
                    ))}
                </Box>

                {/* Book Appointment Button - Enhanced */}
                <Box sx={{ mb: 4 }}>
                    <Box
                        component="button"
                        onClick={() => setShowAllDates(prev => !prev)}
                        sx={{
                            px: 6,
                            py: 2,
                            fontSize: { xs: '18px', sm: '20px' },
                            fontWeight: 700,
                            color: '#fff',
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            borderRadius: '50px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            '&:hover': {
                                transform: 'translateY(-3px) scale(1.05)',
                                boxShadow: '0 15px 40px rgba(102, 126, 234, 0.4)',
                            },
                            '&:active': {
                                transform: 'translateY(-1px) scale(1.02)',
                            }
                        }}
                    >
                        <CalendarTodayIcon />
                        {showAllDates ? 'סגור תאריכים' : 'קבע תור'}
                    </Box>
                </Box>

                {/* 📅 Date List Fold-down - Enhanced */}
                <Box
                    sx={{
                        overflow: 'hidden',
                        maxHeight: showAllDates ? '3000px' : 0,
                        transition: 'max-height 0.8s ease',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {dates.map((item, index) => (
                        <Box
                            key={index}
                            onClick={() => setSelectedDate(selectedDate === index ? null : index)}
                            sx={{
                                background: selectedDate === index
                                    ? 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))'
                                    : 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                color: '#333',
                                borderRadius: '20px',
                                py: { xs: 3, sm: 3.5 },
                                px: { xs: 3, sm: 4 },
                                mb: 2,
                                width: '100%',
                                maxWidth: '900px',
                                textAlign: 'center',
                                fontFamily: '"Poppins", sans-serif',
                                fontSize: { xs: '18px', sm: '20px', md: '22px' },
                                fontWeight: 600,
                                boxShadow: selectedDate === index
                                    ? '0 15px 40px rgba(102, 126, 234, 0.2)'
                                    : '0 8px 25px rgba(0,0,0,0.08)',
                                border: selectedDate === index
                                    ? '2px solid #667eea'
                                    : '1px solid rgba(255, 255, 255, 0.3)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'pointer',
                                position: 'relative',
                                animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                                '&:hover': {
                                    backgroundColor: 'rgba(102, 126, 234, 0.05)',
                                    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.15)',
                                    border: '2px solid #667eea',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                                <CalendarTodayIcon sx={{ color: '#667eea' }} />
                                <span style={{ color: '#333', fontWeight: 700 }}>{item.day}</span>
                                <span style={{ color: '#666' }}>-</span>
                                <span style={{ color: '#333' }}>{item.date}</span>
                            </Box>

                            <Box
                                sx={{
                                    maxHeight: selectedDate === index ? 'fit-content' : '0px',
                                    opacity: selectedDate === index ? 1 : 0,
                                    overflow: 'hidden',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    mt: selectedDate === index ? 3 : 0,
                                    transform: selectedDate === index ? 'translateY(0)' : 'translateY(-10px)',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(5, 1fr)' },
                                        gap: { xs: 2, sm: 2.5 },
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        mt: 2,
                                        pb: 2, // Add padding bottom for better spacing
                                    }}
                                >
                                    {(() => {
                                        const slots = timeSlotsByDate?.[dates[index].date] || [];
                                        console.log(`Displaying slots for ${dates[index].date}:`, slots); // Debug log
                                        return slots.map((time, i) => (
                                            <Chip
                                                key={i}
                                                label={time}
                                                icon={<AccessTimeIcon />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsOpen(true);
                                                    setSelectedTime(time);
                                                }}
                                                sx={{
                                                    background: 'linear-gradient(45deg, #f8f9fa, #e9ecef)',
                                                    color: '#333',
                                                    borderRadius: '15px',
                                                    py: { xs: 1.5, sm: 2 }, // Responsive padding
                                                    px: 1,
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    fontSize: { xs: '13px', sm: '14px', md: '15px' }, // Responsive font size
                                                    fontWeight: 600,
                                                    border: '1px solid rgba(102, 126, 234, 0.2)',
                                                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                                                    height: { xs: '40px', sm: '48px' }, // Responsive height
                                                    minWidth: { xs: '60px', sm: '70px' }, // Ensure minimum width
                                                    opacity: selectedDate === index ? 1 : 0,
                                                    transform: selectedDate === index ? 'scale(1)' : 'scale(0.95)',
                                                    animation: selectedDate === index ? `chipSlideIn 0.2s ease-out ${i * 0.02}s both` : 'none',
                                                    '@keyframes chipSlideIn': {
                                                        '0%': {
                                                            opacity: 0,
                                                            transform: 'translateY(10px) scale(0.95)'
                                                        },
                                                        '100%': {
                                                            opacity: 1,
                                                            transform: 'translateY(0) scale(1)'
                                                        }
                                                    },
                                                    '&:hover': {
                                                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                        color: '#fff',
                                                        transform: 'translateY(-2px) scale(1.05)',
                                                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                                                        '& .MuiChip-icon': {
                                                            color: '#fff'
                                                        }
                                                    },
                                                    '& .MuiChip-icon': {
                                                        color: '#667eea',
                                                        fontSize: { xs: '16px', sm: '18px' } // Responsive icon size
                                                    }
                                                }}
                                            />
                                        ));
                                    })()}
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* 📝 Modal - Enhanced */}
            {isOpen && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: "auto",
                        zIndex: 1300,
                        px: 2,
                        overflow: 'hidden',
                        animation: 'fadeIn 0.3s ease-out',
                        '@keyframes fadeIn': {
                            '0%': { opacity: 0 },
                            '100%': { opacity: 1 }
                        }
                    }}
                    onClick={() => setIsOpen(false)}
                >
                    <Box
                        sx={{
                            width: { xs: '95%', sm: '80%', md: '60%', lg: '40%', xl: '35%' },
                            maxWidth: '500px',
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            display: "flex",
                            flexDirection: "column",
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 4,
                            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.2)',
                            minHeight: 450,
                            animation: 'slideInUp 0.4s ease-out',
                            '@keyframes slideInUp': {
                                '0%': {
                                    opacity: 0,
                                    transform: 'translateY(30px) scale(0.95)'
                                },
                                '100%': {
                                    opacity: 1,
                                    transform: 'translateY(0) scale(1)'
                                }
                            }
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                textAlign: "center",
                                fontWeight: 700,
                                fontSize: { xs: "18px", sm: "20px", md: "22px" },
                                color: "#333",
                                mb: 3,
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            📝 הזן פרטים
                        </Typography>

                        <InputBox
                            selectedDate={dates[selectedDate].date}
                            selectedTime={selectedTime}
                            business={businesses.find(business => business.name === name)}
                            setIsOpen={setIsOpen}
                            isCustomerValid={isCustomerValid}
                            createAppointment={createAppointment}
                            setAppointmentCreated={setAppointmentCreated}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
}
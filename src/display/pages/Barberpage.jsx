import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import InputBox from '../../helpers/InputBox';
import LocationPinIcon from '@mui/icons-material/LocationPin';

export default function BarberPage({ dates, timeSlots, selectedDate, isOpen, setSelectedDate, setIsOpen, setShowAllDates, showAllDates, name, businesses, setSelectedTime, selectedTime }) {


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
            {/* Background pattern */}
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
            <Box sx={{ position: 'relative', mb: 5 }}>
                <Typography sx={{ fontWeight: "bold", letterSpacing: "1px", textAlign: "center", mb: 1 }} variant='h3'>{name}</Typography>
                <Typography sx={{ fontWeight: "bold", letterSpacing: "1px", textAlign: "center", opacity: 0.7 }} variant='h6'>
                    {
                        businesses.find(business => business.name === name)
                            ? `${businesses.find(business => business.name === name).address.streetAddress}, ${businesses.find(business => business.name === name).address.city}`
                            : "Address not found"
                    }
                    <LocationPinIcon />
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
            <Box sx={{ position: 'relative', width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 11 }}>


                {/* 💈 Pricing Board */}
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 500,
                        backgroundColor: '#fff',
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        p: { xs: 2, sm: 3 },
                        mb: 4,
                        textAlign: 'right',
                        direction: 'rtl',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '18px', sm: '20px' },
                            mb: 2,
                            textAlign: 'center',
                            color: '#111',
                        }}
                    >
                        מחירי שירותים
                    </Typography>

                    {[
                        { service: 'תספורת רגילה', price: '₪60' },
                        { service: 'עיצוב זקן', price: '₪40' },
                        { service: 'תספורת ילדים', price: '₪50' },
                        { service: 'צבע / החלקה', price: '₪150+' },
                    ].map((item, index) => (
                        <Box key={index} sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            borderBottom: index !== 3 ? '1px solid #eee' : 'none',
                            py: 1
                        }}>
                            <Typography sx={{ fontWeight: 500 }}>{item.service}</Typography>
                            <Typography sx={{ fontWeight: 600 }}>{item.price}</Typography>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ mb: 3 }}>
                    <Box
                        component="button"
                        onClick={() => setShowAllDates(prev => !prev)}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: { xs: '16px', sm: '18px' },
                            fontWeight: 600,
                            color: '#fff',
                            backgroundColor: '#222',
                            borderRadius: 3,
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                            transition: '0.3s',
                            '&:hover': {
                                backgroundColor: '#000',
                                transform: 'scale(1.03)',
                            }
                        }}
                    >
                        קבע תור
                    </Box>
                </Box>

                {/* 📅 Date List Fold-down */}
                <Box
                    sx={{
                        overflow: 'hidden',
                        maxHeight: showAllDates ? '3000px' : 0,
                        transition: 'max-height 0.8s ease',
                        width: '110%',
                    }}
                >
                    {dates.map((item, index) => (
                        <Box
                            key={index}
                            onClick={() => setSelectedDate(selectedDate === index ? null : index)}
                            sx={{
                                backgroundColor: '#fff',
                                color: '#222',
                                borderRadius: '18px',
                                py: { xs: 2, sm: 2.5 },
                                px: { xs: 2.5, sm: 4 },
                                m: { xs: 2, sm: 2.5 },
                                width: '100%',
                                maxWidth: 900,
                                textAlign: 'center',
                                fontFamily: '"Poppins", sans-serif',
                                fontSize: { xs: '18px', sm: '20px', md: '22px' },
                                fontWeight: 600,
                                boxShadow: selectedDate === index ? '0 6px 24px rgba(0,0,0,0.13)' : '0 2px 8px rgba(0,0,0,0.10)',
                                border: selectedDate === index ? '2px solid #111' : '1.5px solid #bbb',
                                transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
                                cursor: 'pointer',
                                mb: 2,
                                position: 'relative',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
                                    border: '2px solid #111',
                                    transform: 'scale(1.004)',
                                },
                            }}
                        >
                            <span style={{ color: '#111', fontWeight: 700 }}>{item.day}</span> - {item.date}

                            <Box
                                sx={{
                                    maxHeight: selectedDate === index ? '500px' : '0px',
                                    overflow: 'hidden',
                                    transition: 'max-height 0.4s cubic-bezier(.4,2,.6,1)',
                                    mt: selectedDate === index ? 2 : 0,
                                }}
                            >
                                {selectedDate === index && (
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(5, 1fr)', md: 'repeat(6, 1fr)' },
                                            gap: { xs: 1.5, sm: 2.5 },
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            mt: 2,
                                        }}
                                    >
                                        {timeSlots.map((time, i) => (
                                            <Box
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setIsOpen(true);
                                                    setSelectedTime(time)
                                                }}
                                                key={i}
                                                sx={{
                                                    backgroundColor: '#ededed',
                                                    color: '#111',
                                                    borderRadius: '10px',
                                                    py: 1.2,
                                                    px: 0,
                                                    cursor: 'pointer',
                                                    transition: '0.2s',
                                                    fontSize: { xs: '15px', sm: '16px' },
                                                    fontWeight: 600,
                                                    border: '1.5px solid #bbb',
                                                    boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                                                    '&:hover': {
                                                        backgroundColor: '#e0e0e0',
                                                        color: '#000',
                                                        border: '2px solid #111',
                                                        transform: 'scale(1.07)',
                                                    },
                                                }}
                                            >
                                                {time}
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* 📝 Modal */}
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

                        <InputBox selectedDate={dates[selectedDate].date} selectedTime={selectedTime} business={businesses.find(business => business.name == name)} setIsOpen={setIsOpen} onClose={() => setIsOpen(false)} />
                    </Box>
                </Box>
            )}
        </Box>
    );
}

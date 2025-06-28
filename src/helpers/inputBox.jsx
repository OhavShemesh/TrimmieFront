import { Box, Button, Input, InputLabel, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAppointments from './hooks/useAppointments';

export default function InputBox({ setIsOpen, business, selectedTime, selectedDate }) {
    const { createAppointment, isCustomerValid } = useAppointments()

    const [customer, setCustomer] = useState({
        businessId: business._id,
        customerName: "",
        customerPhone: "",
        service: "",
        scheduledAt: `${selectedDate} ${selectedTime}`
    });
    const handleChange = (e) => {
        const { name, value } = e.target;

        setCustomer((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <Box sx={{ width: '100%', alignSelf: 'center', mb: 2, mt: 3 }}>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mb: 3 }}>
                    <InputLabel sx={{ mb: 0.5, color: "#000", fontSize: { xs: "12px", sm: "13px" }, fontWeight: 400, alignSelf: 'center' }}>
                        שם מלא
                    </InputLabel>
                    <Input
                        fullWidth
                        name="customerName"
                        value={customer.name}
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

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 2 }}>
                    <InputLabel sx={{ mb: 0.5, color: "#000", fontSize: { xs: "12px", sm: "13px" }, fontWeight: 400, alignSelf: 'center' }}>
                        טלפון
                    </InputLabel>
                    <Input
                        type="number"
                        fullWidth
                        name="customerPhone"
                        value={customer.phone}
                        onChange={handleChange}
                        sx={{
                            direction: "rtl",
                            color: "#000",
                            fontSize: { xs: "13px", sm: "14px" },
                            background: '#fff',
                            borderRadius: '6px',
                            px: 1.5,
                            py: 1,
                            border: '1px solid lightgrey',
                            boxShadow: 'none',
                            '& input[type=number]::-webkit-outer-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                            },
                            '& input[type=number]::-webkit-inner-spin-button': {
                                WebkitAppearance: 'none',
                                margin: 0,
                            },
                            '& input[type=number]': {
                                MozAppearance: 'textfield',
                            },
                            '&:before': { borderBottom: 'none' },
                            '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
                            '&:after': { borderBottom: '2px solid #000' },
                            transition: 'background 0.2s',
                            maxWidth: 350,
                            alignSelf: 'center',
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 3 }}>
                    <InputLabel sx={{ mb: 0.5, color: "#000", fontSize: { xs: "12px", sm: "13px" }, fontWeight: 400, alignSelf: 'center' }}>
                        בחר שירות
                    </InputLabel>
                    <Box
                        component="select"
                        defaultValue=""
                        name="service"
                        value={customer.service}
                        onChange={handleChange}
                        sx={{
                            direction: "rtl",
                            color: "#222",
                            fontSize: { xs: "13px", sm: "14px" },
                            background: '#fff',
                            borderRadius: '6px',
                            px: 1.5,
                            py: 1.2,
                            border: '1px solid lightgrey',
                            boxShadow: 'none',
                            maxWidth: 350,
                            width: '100%',
                            appearance: 'none',
                            '&:focus': {
                                outline: 'none',
                                border: '1.5px solid #000',
                            },
                            '& option': {
                                fontSize: '14px',
                                direction: 'rtl',
                            }
                        }}
                    >
                        <option value="" disabled hidden>בחר שירות</option>
                        {business.services.map((service, idx) => (
                            <option key={idx} value={service}>{service}</option>
                        ))}
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 3 }}>
                    <Button
                        onClick={() => {
                            setIsOpen(false)
                            createAppointment(customer)
                        }}
                        variant="contained"
                        disabled={!isCustomerValid(customer)}
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
                        שלח
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

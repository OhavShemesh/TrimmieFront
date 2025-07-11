import { Box, Button, Input, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useAppointments from './hooks/useAppointments';
import { useSnack } from './snack/useSnack';

export default function InputBox({ setIsOpen, business, selectedTime, selectedDate, createAppointment, isCustomerValid }) {

    const [selectedGender, setSelectedGender] = useState(null);
    const showSnack = useSnack()

    const [customer, setCustomer] = useState({
        businessId: business.businessId,
        customerName: "",
        customerPhone: "",
        service: "",
        scheduledAt: `${selectedDate} ${selectedTime}`
    });

    // Update selectedGender automatically if only one gender array is filled
    useEffect(() => {
        if (!selectedGender && business?.services?.[0]) {
            const serviceObj = business.services[0];
            const filledKeys = ['men', 'women'].filter(
                (key) => Array.isArray(serviceObj[key]) && serviceObj[key].length > 0
            );
            if (filledKeys.length === 1) {
                setSelectedGender(filledKeys[0]);
            }
        }
    }, [business, selectedGender]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCustomer((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Count how many service arrays have data
    const filledArraysCount = business?.services?.[0]
        ? ['men', 'women'].reduce((count, key) => {
            if (Array.isArray(business.services[0][key]) && business.services[0][key].length > 0) {
                return count + 1;
            }
            return count;
        }, 0)
        : 0;


    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <Box sx={{ width: '100%', alignSelf: 'center', mb: 2, mt: 3 }}></Box>

            <Box sx={{ mt: 2 }}>
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
                        שם מלא
                    </InputLabel>
                    <Input
                        fullWidth
                        name="customerName"
                        value={customer.customerName}
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
                    <InputLabel
                        sx={{
                            mb: 0.5,
                            color: "#000",
                            fontSize: { xs: "12px", sm: "13px" },
                            fontWeight: 400,
                            alignSelf: 'center',
                        }}
                    >
                        טלפון
                    </InputLabel>
                    <Input
                        type="number"
                        fullWidth
                        name="customerPhone"
                        value={customer.customerPhone}
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
                    <InputLabel
                        sx={{
                            mb: 0.5,
                            color: "#000",
                            fontSize: { xs: "12px", sm: "13px" },
                            fontWeight: 400,
                            alignSelf: 'center',
                        }}
                    >
                        {selectedGender
                            ? "בחר שירות"
                            : filledArraysCount === 1
                                ? "בחר שירות"
                                : "בחר למי התספורת"}
                    </InputLabel>

                    {/* Gender selection buttons, hidden if only one filled array or gender selected */}
                    <Box
                        sx={{
                            display: selectedGender || filledArraysCount === 1 ? "none" : "flex",
                            gap: 1,
                        }}
                    >
                        <Button
                            onClick={() => setSelectedGender("men")}
                            sx={{
                                px: 1,
                                py: 0.5,
                                fontSize: { xs: '14px', sm: '16px' },
                                fontWeight: 400,
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
                            גבר
                        </Button>
                        <Button
                            onClick={() => setSelectedGender("women")}
                            sx={{
                                px: 1,
                                py: 0.5,
                                fontSize: { xs: '14px', sm: '16px' },
                                fontWeight: 400,
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
                            אישה
                        </Button>
                    </Box>

                    {/* Service selection dropdown */}
                    <Box
                        component="select"
                        defaultValue=""
                        name="service"
                        onChange={handleChange}
                        sx={{
                            display: selectedGender || filledArraysCount === 1 ? "auto" : "none",
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
                        {selectedGender &&
                            business.services[0][selectedGender]?.map((service, idx) => (
                                <option key={idx} value={service.type}>
                                    {service.type}
                                </option>
                            ))}
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 3 }}>
                    <Button
                        onClick={async () => {
                            const success = await createAppointment(customer);
                            if (success) {
                                showSnack("הפגישה נקבעה בהצלחה", "success");
                                setIsOpen(false);
                                if (typeof setAppointmentCreated === 'function') {
                                    setAppointmentCreated(true);
                                }
                            } else {
                                showSnack("אירעה שגיאה בעת קביעת הפגישה", "error");
                            }
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

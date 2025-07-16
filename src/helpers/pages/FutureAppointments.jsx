import { Box, IconButton, Typography, Paper } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

export default function FutureAppointments({ setIsOverlayOpen, customerAppointments, businessNames }) {
    const handleCancelAppointment = (appointmentId) => {
        console.log("Cancel appointment", appointmentId);
    };

    return (
        <Box
            sx={{
                backgroundColor: "white",
                width: "40%",
                height: "60%",
                borderRadius: "40px",
                position: "relative",
                boxShadow: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pt: 6,
                pb: 4,
            }}
        >
            {/* Close Button - fixed inside box */}
            <IconButton
                onClick={() => setIsOverlayOpen(false)}
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 2,
                }}
            >
                <CloseIcon />
            </IconButton>

            {/* Title */}
            <Typography variant='h4' sx={{ textAlign: "center", mb: 4 }}>
                תורים קיימים
            </Typography>

            {/* Scrollable Appointment List */}
            <Box
                sx={{
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    '&::-webkit-scrollbar': { display: 'none' },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                    width: "100%",
                    px: 4,
                }}
            >
                {customerAppointments?.length === 0 ? (
                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                        אין תורים קרובים
                    </Typography>
                ) : (
                    customerAppointments?.map((appointment) => (
                        <Paper
                            key={appointment?.id}
                            elevation={2}
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                backgroundColor: "#f9f9f9",
                                width: "70%",
                                wordBreak: "break-word",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    direction: "rtl",
                                }}
                            >
                                {/* Right side: Appointment details */}
                                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                    <Typography variant="body1">📅 {appointment?.scheduledAt}</Typography>
                                    <Typography variant="body2">✂️ שירות: {appointment?.service}</Typography>
                                    <Typography variant="body2">🏢 עסק: {businessNames[appointment?.businessId] || "לא ידוע"}</Typography>
                                </Box>

                                {/* Left side: Cancel button */}
                                <IconButton
                                    color="error"
                                    onClick={() => handleCancelAppointment(appointment?.id)}
                                    sx={{ ml: 1 }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Paper>
                    ))
                )}
            </Box>
        </Box>
    );
}

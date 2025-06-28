import { Box, Card, CardActionArea, CardHeader, Icon, Typography } from '@mui/material';
import React from 'react';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../display/router/routesModule';

export default function BusinessCard({ business, navigateToBarberPage }) {
    return (
        <CardActionArea onClick={() => navigateToBarberPage(business.name)} sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', gap: 1, padding: "15px 5px 15px 5px" }}>
            <LocationPinIcon sx={{ fontSize: '36px' }} />
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>{business.name}</Typography>
            <Typography variant='h6'>{business.address.city}</Typography>
            <Typography variant='h6'>{business.address.streetAddress}</Typography>
            <Typography variant='h6' sx={{ fontWeight: "bold" }}>{business.for === "male" ? "גברים" : business.for === "female" ? "נשים" : "נשים / גברים"}</Typography>
        </CardActionArea>
    );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomePage from '../HomePage';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../router/routesModule';
import useBusinesses from '../../../helpers/hooks/useBusinesses';


export default function HomePageManager() {
    const navigate = useNavigate()
    const { businesses } = useBusinesses()
    


    const navigateToBarberPage = (name) => {
        navigate(ROUTES.HOME + name)
    }


    return <HomePage businesses={businesses} navigateToBarberPage={navigateToBarberPage} navigate={navigate} />;
}

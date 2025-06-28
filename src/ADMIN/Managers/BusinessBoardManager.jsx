import React, { useEffect, useState } from 'react';
import BusinessBoard from '../BusinessBoard';
import useUsers from '../../helpers/hooks/useUsers';

export default function BusinessBoardManager() {
    const { isAdmin, isConnected } = useUsers();




    return (
        <BusinessBoard isUserConnected={isConnected} isUserAdmin={isAdmin} />
    );
}

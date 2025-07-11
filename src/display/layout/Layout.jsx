import React, { useState } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import useUsers from '../../helpers/hooks/useUsers'

export default function Layout({ children }) {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState()

    const { loginData, handleChange, login, isConnected, isAdmin, logout, connectedUser } = useUsers();

    const handleSubmit = async () => {
        const success = await login();
        if (success) {
            setIsOpen(false); // close modal or box
            window.location.reload()
        } else {
            alert("שם משתמש או סיסמא שגויים");
        }
    };




    return (
        <>
            <Header navigate={navigate} isOpen={isOpen} setIsOpen={setIsOpen} loginData={loginData} handleChange={handleChange} handleSubmit={handleSubmit} isConnected={isConnected} isAdmin={isAdmin} logout={logout} connectedUser={connectedUser} />
            <Main>{children}</Main>
            <Footer />
        </>
    )
}

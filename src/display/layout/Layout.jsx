import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

export default function Layout({ children }) {

    const navigate = useNavigate()

    return (
        <>
            <Header navigate={navigate} />
            <Main>{children}</Main>
            <Footer />
        </>
    )
}

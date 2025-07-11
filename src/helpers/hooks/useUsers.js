import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const useUsers = () => {
    const navigate = useNavigate()
    const [isConnected, setIsConnected] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [connectedUser, setConnectedUser] = useState(null)

    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const login = async () => {
        try {

            const response = await axios.post("http://localhost:8181/users/login", loginData);
            localStorage.setItem("token", response.data.token);

            return true;
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            return false;
        }
    };

    const isUserAdmin = () => {

        const token = localStorage.getItem('token');
        if (!token) return false;
        try {
            const decoded = jwtDecode(token);
            return decoded.isAdmin
        } catch (err) {
            console.error("Invalid token", err);
            return false;
        }
    };
    const isUserConnected = () => {
        const token = localStorage.getItem('token');
        return !!token; // returns true if token exists, false otherwise
    };

    useEffect(() => {
        const checkUserStatus = () => {

            const connected = isUserConnected();

            const admin = connected && isUserAdmin();

            setIsConnected(connected);
            setIsAdmin(admin);

        };

        checkUserStatus();
    }, [isUserConnected, isUserAdmin]);

    const logout = () => {
        localStorage.removeItem('token');
    };
    useEffect(() => {
        if (isConnected === true) {

            const getUserDetails = async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    return
                }
                const decoded = jwtDecode(token);
                const user = await axios.get("http://localhost:8181/users/getUserById", { params: { id: decoded.userId } });
                setConnectedUser(user.data)

            }
            getUserDetails()

        }

    }, [isConnected])


    return {
        loginData,
        handleChange,
        login,
        isUserAdmin,
        isUserConnected,
        isConnected,
        isAdmin,
        logout,
        connectedUser
    };
};

export default useUsers;

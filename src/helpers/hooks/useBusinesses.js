import axios from "axios";
import { useEffect, useState } from "react";
import useUsers from "./useUsers";

const useBusinesses = () => {
    const [businesses, setBusinesses] = useState([]);
    const [business, setBusiness] = useState()
    const { connectedUser } = useUsers()

    useEffect(() => {
        const getAllBusinesses = async () => {
            try {
                const response = await axios.get("http://localhost:8181/businesses");
                const data = response.data;
                setBusinesses(data);
            } catch (error) {
                console.error("Failed to fetch businesses:", error);
            }
        };
        getAllBusinesses()
    }, [])
    useEffect(() => {
        const getBusinessByBusinessId = async () => {
            try {
                const response = await axios.get("http://localhost:8181/businesses/getBusinessByBusinessId", { params: { businessId: connectedUser?.businessId } });
                const data = response.data
                setBusiness(data)

            } catch (error) {
                console.error("Failed to fetch business:", error);

            }
        }
        if (connectedUser?.isAdmin === true) {
            getBusinessByBusinessId()
        }
    }, [connectedUser])

    const updateAvailableAppointments = async (availableSlots) => {
        try {

            const response = await axios.patch("http://localhost:8181/businesses/updateAvailableAppointmentsByBusinessId", {
                availableAppointments: availableSlots,
                businessId: connectedUser?.businessId
            });



        } catch (error) {
            console.error("Failed to update available appointments:", error);

        }
    }
    const removeFromAvailableAppointments = async (businessId, date, time) => {
        try {
            const response = await axios.patch("http://localhost:8181/businesses/removeFromAvailableAppointments", { businessId: businessId, date: date, time: time })

        } catch (error) {
            console.error("Failed to update available appointments:", error);

        }
    }
    const getBusinessByName = async (name) => {
        try {
            const response = await axios.get("http://localhost:8181/businesses/getBusinessByName", { params: { name: name } })
            return response.data
        } catch (error) {
            console.error("Failed to fetch business by name :", error);

        }
    }
    const getBusinessByBusinessId = async (businessId) => {
        try {
            const response = await axios.get("http://localhost:8181/businesses/getBusinessByBusinessId", { params: { businessId: businessId } });
            const data = response.data
            return data


        } catch (error) {
            console.error("Failed to fetch business:", error);

        }
    }


    return { setBusinesses, businesses, business, updateAvailableAppointments, removeFromAvailableAppointments, getBusinessByName, getBusinessByBusinessId }

}

export default useBusinesses
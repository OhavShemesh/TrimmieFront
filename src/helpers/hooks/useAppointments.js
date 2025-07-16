import axios from "axios"
import { useState } from "react"
import useBusinesses from "./useBusinesses"

const useAppointments = () => {
    const [allAppointments, setAllAppointments] = useState(null)
    const { removeFromAvailableAppointments } = useBusinesses()

    const createAppointment = async (data) => {
        try {

            const [date, time] = data.scheduledAt.split(" ");
            const appointment = await axios.post("http://localhost:8181/appointments", data);
            await removeFromAvailableAppointments(data.businessId, date, time);

            return true;
        } catch (error) {
            console.error("Failed to create appointment:", error);
            return false;
        }
    };

    const isCustomerValid = (customer) => {
        if (!customer) return false;

        const { customerName, customerPhone, service } = customer;

        // Validate name: at least 2 letters (can add regex if you want stricter)
        if (typeof customerName !== 'string' || customerName.trim().length < 2) return false;

        // Validate phone: string or number starting with '05' and at least 10 digits
        const phoneStr = String(customerPhone).trim();
        if (!/^05\d{8}$/.test(phoneStr)) return false;
        // Validate service: non-empty string
        if (typeof service !== 'string' || service.trim().length === 0) return false;

        return true; // all good
    };

    const getAllAppointments = async () => {
        try {
            const appointments = await axios.get("http://localhost:8181/appointments")
            setAllAppointments(appointments.data)
        } catch (error) {
            console.error("Failed to fetch businesses:", error);
            return false
        }

    }
    const getAllBusinessAppointmentsByBusinessId = async (businessId) => {
        try {
            const appointments = await axios.get("http://localhost:8181/appointments/getAllBusinessAppointmentsByBusinessId", { params: { businessId } })
            return appointments.data
        } catch (error) {
            console.error("Failed to fetch businesses:", error);
            return false
        }
    }
    const getAllAppointmentsByPhoneNumber = async (phoneNumber) => {
        try {
            const response = await axios.get("http://localhost:8181/appointments/getAllAppointmentsByPhoneNumber", { params: { phoneNumber: phoneNumber } })
            return response.data
        } catch (error) {
            console.error("Failed to fetch appointments by phone number:", error);
            return false

        }
    }
    return { createAppointment, isCustomerValid, getAllAppointments, getAllBusinessAppointmentsByBusinessId, getAllAppointmentsByPhoneNumber }
}
export default useAppointments
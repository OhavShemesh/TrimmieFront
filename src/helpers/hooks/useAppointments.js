import axios from "axios"

const useAppointments = () => {
    const createAppointment = async (data) => {
        console.log("data", data);
        const appointment = await axios.post("http://localhost:8181/appointments", data)
        console.log("appointment", appointment);


        if (appointment === true) {
            return true
        } else {
            return false
        }
    }

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

    return { createAppointment, isCustomerValid }
}
export default useAppointments
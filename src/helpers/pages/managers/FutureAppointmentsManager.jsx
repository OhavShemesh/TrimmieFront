import React, { useEffect, useState } from 'react';
import FutureAppointments from '../FutureAppointments';
import CryptoJS from 'crypto-js';
import useAppointments from '../../hooks/useAppointments';
import useBusinesses from '../../hooks/useBusinesses';

export default function FutureAppointmentsManager({ setIsOverlayOpen }) {
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [customerAppointments, setCustomerAppointments] = useState(null);
    const [businessNames, setBusinessNames] = useState({}); // map of businessId => name

    const { getAllAppointmentsByPhoneNumber } = useAppointments();
    const { getBusinessByBusinessId } = useBusinesses();

    useEffect(() => {
        const phoneFromLocalStorage = localStorage.getItem("customerPhone");
        if (phoneFromLocalStorage) {
            try {
                // If encrypted, decrypt here — or just set as is if already decrypted
                setPhoneNumber(phoneFromLocalStorage);
            } catch (error) {
                console.error("Decryption failed:", error);
                setPhoneNumber(null);
            }
        }
    }, []);

    useEffect(() => {
        if (!phoneNumber) return;

        const fetchAppointmentsAndBusinesses = async () => {
            try {
                const appointments = await getAllAppointmentsByPhoneNumber(phoneNumber);
                setCustomerAppointments(appointments);

                // Fetch all business names for unique businessIds
                const uniqueBusinessIds = [...new Set(appointments.map(appt => appt.businessId))];

                const namesMap = {};

                await Promise.all(
                    uniqueBusinessIds.map(async (id) => {
                        try {
                            const response = await getBusinessByBusinessId(id);

                            namesMap[id] = response?.name || "לא ידוע";
                        } catch (error) {
                            console.error("Error fetching business name for id:", id, error);
                            namesMap[id] = "לא ידוע";
                        }
                    })
                );

                setBusinessNames(namesMap);
            } catch (error) {
                console.error("Failed fetching appointments or business names:", error);
            }
        };

        fetchAppointmentsAndBusinesses();
    }, [phoneNumber]);

    return (
        <FutureAppointments
            setIsOverlayOpen={setIsOverlayOpen}
            customerAppointments={customerAppointments}
            businessNames={businessNames} // pass the map here
        />
    );
}

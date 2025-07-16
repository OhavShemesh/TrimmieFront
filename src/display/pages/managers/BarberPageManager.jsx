import React, { useEffect, useMemo, useState } from 'react';
import BarberPage from '../Barberpage';
import { useParams } from 'react-router-dom';
import useBusinesses from '../../../helpers/hooks/useBusinesses';
import useAppointments from '../../../helpers/hooks/useAppointments';
import CryptoJS from "crypto-js";

export default function BarberPageManager() {
    const { businesses, getBusinessByName } = useBusinesses();
    const [business, setBusiness] = useState(null)
    const [timeSlotsByDate, setTimeSlotsByDate] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState(null);
    const [showAllDates, setShowAllDates] = useState(false);
    const { "*": name } = useParams();
    const { createAppointment, isCustomerValid } = useAppointments();
    const [appointmentCreated, setAppointmentCreated] = useState(false);

    const secretKey = import.meta.env.VITE_CUSTOMER_SECRET_KEY;

    useEffect(() => {
        const fetchBusiness = async () => {
            try {

                const businessByName = await getBusinessByName(name);
                setBusiness(businessByName);
            } catch (error) {
                console.error("Failed to fetch business by name:", error);
            }
        };

        fetchBusiness();
    }, [name]);


    const getHebrewDates = () => {
        const hebrewDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
        const today = new Date();
        let daysArray = [];

        let i = 0;
        while (daysArray.length < 7) {
            let newDate = new Date();
            newDate.setDate(today.getDate() + i);
            const dayOfWeek = newDate.getDay();

            if (dayOfWeek !== 1 && dayOfWeek !== 6) {
                const day = String(newDate.getDate()).padStart(2, "0");
                const month = String(newDate.getMonth() + 1).padStart(2, "0");
                const year = newDate.getFullYear();
                const formattedDate = `${day}.${month}.${year}`;
                daysArray.push({ day: hebrewDays[dayOfWeek], date: formattedDate });
            }

            i++;
        }

        return daysArray;
    };

    const dates = useMemo(() => getHebrewDates(), []);

    const generateTimeSlots = (openingHour, closingHour) => {
        const [startH, startM = 0] = openingHour.split(":").map(Number);
        const [endH, endM = 0] = closingHour.split(":").map(Number);

        const slots = [];
        for (let hour = startH; hour < endH; hour++) {
            for (let min = 0; min < 60; min += 10) {
                slots.push(`${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`);
            }
        }
        if (endM > 0) {
            slots.push(`${endH.toString().padStart(2, "0")}:00`);
        }
        return slots;
    };

    useEffect(() => {
        if (!business?.workingHours?.length || !business?.availableAppointments) return;

        const defaultSlots = generateTimeSlots(
            business.workingHours[0].openingHour,
            business.workingHours[0].closingHour
        );

        const slotsMap = {};

        dates.forEach(({ date }) => {
            const found = business.availableAppointments.find(app => app.date === date);
            slotsMap[date] = found ? [...found.times] : defaultSlots;
        });

        setTimeSlotsByDate(slotsMap);
        setAppointmentCreated(false);
    }, [business, dates]);

    const handleCreateAppointment = async (customer) => {
        const success = await createAppointment(customer);
        if (success) {
            setTimeSlotsByDate(prev => {
                const updated = { ...prev };
                const times = updated[selectedDate] || [];
                updated[selectedDate] = times.filter(time => time !== selectedTime);
                return updated;
            });


            if (customer.customerPhone) {
                try {
                    localStorage.setItem("customerPhone", customer.customerPhone);
                } catch (err) {
                    console.error("Failed to encrypt phone:", err);
                }
            }

            setAppointmentCreated(true);
        }
        return success;
    };

    return (
        <BarberPage
            getHebrewDates={getHebrewDates}
            dates={dates}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            showAllDates={showAllDates}
            setShowAllDates={setShowAllDates}
            name={name}
            businesses={businesses}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            timeSlotsByDate={timeSlotsByDate}
            createAppointment={handleCreateAppointment}
            isCustomerValid={isCustomerValid}
            setAppointmentCreated={setAppointmentCreated}
        />
    );
}

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
        console.log('Input:', { openingHour, closingHour }); // Debug log

        const [startH, startM = 0] = openingHour.split(":").map(Number);
        const [endH, endM = 0] = closingHour.split(":").map(Number);

        console.log('Parsed:', { startH, startM, endH, endM }); // Debug log

        const slots = [];

        // Create start and end times in minutes for easier comparison
        const startTimeInMinutes = startH * 60 + startM;
        const endTimeInMinutes = endH * 60 + endM;

        // Generate slots every 10 minutes from start to end (inclusive)
        for (let timeInMinutes = startTimeInMinutes; timeInMinutes <= endTimeInMinutes; timeInMinutes += 10) {
            const hours = Math.floor(timeInMinutes / 60);
            const minutes = timeInMinutes % 60;
            const timeSlot = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
            slots.push(timeSlot);
        }

        console.log('Generated slots:', slots); // Debug log
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
            // ✅ FIX: Get the actual date string from the dates array using selectedDate index
            const actualDate = dates[selectedDate]?.date;

            setTimeSlotsByDate(prev => {
                const updated = { ...prev };
                const times = updated[actualDate] || [];
                updated[actualDate] = times.filter(time => time !== selectedTime);
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
import React, { useEffect, useState } from 'react'
import HomePage from '../HomePage'
import BarberPage from '../Barberpage';
import { useParams } from 'react-router-dom';
import useBusinesses from '../../../helpers/hooks/useBusinesses';
import useAppointments from '../../../helpers/hooks/useAppointments';

export default function BarberPageManager() {
    const { business, businesses } = useBusinesses()
    const [timeSlotsByDate, setTimeSlotsByDate] = useState({});
    const [isOpen, setIsOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [showAllDates, setShowAllDates] = useState(false);
    const { "*": name } = useParams();
    const { createAppointment, isCustomerValid } = useAppointments();
    const [appointmentCreated, setAppointmentCreated] = useState(false)

    const getHebrewDates = () => {
        const hebrewDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
        const today = new Date();
        let daysArray = [];

        let i = 0;
        while (daysArray.length < 7) {
            let newDate = new Date();
            newDate.setDate(today.getDate() + i);
            const dayOfWeek = newDate.getDay();

            if (dayOfWeek !== 1 && dayOfWeek !== 6) { // skip Monday and Saturday
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

    const dates = getHebrewDates();

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
        setAppointmentCreated(false)
    }, [business, dates, appointmentCreated]);

    // ✅ Updated handler
    const handleCreateAppointment = async (customer) => {
        const success = await createAppointment(customer);
        if (success) {
            // Remove the selected time from the correct date
            setTimeSlotsByDate(prev => {
                const updated = { ...prev };
                const times = updated[selectedDate] || [];
                updated[selectedDate] = times.filter(time => time !== selectedTime);
                return updated;
            });
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
            createAppointment={handleCreateAppointment} // ✅ use new handler
            isCustomerValid={isCustomerValid}
            setAppointmentCreated={setAppointmentCreated} // ✅ pass this down
        />
    )
}

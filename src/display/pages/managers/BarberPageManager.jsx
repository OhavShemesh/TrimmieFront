import React, { useState } from 'react'
import HomePage from '../HomePage'
import BarberPage from '../Barberpage';
import { useParams } from 'react-router-dom';
import useBusinesses from '../../../helpers/hooks/useBusinesses';

export default function BarberPageManager() {
    const getHebrewDates = () => {
        const hebrewDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
        const today = new Date();
        let daysArray = [];

        for (let i = 0; i < 10; i++) {
            let newDate = new Date();
            newDate.setDate(today.getDate() + i);
            const dayOfWeek = hebrewDays[newDate.getDay()];
            const formattedDate = newDate.toLocaleDateString('he-IL');

            daysArray.push({ day: dayOfWeek, date: formattedDate });
        }

        return daysArray;
    };

    const getTimeSlots = () => {
        let slots = [];
        for (let hour = 10; hour <= 17; hour++) {
            for (let minute = 0; minute < 60; minute += 20) {
                if (hour === 14 || hour === 15) continue;
                slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
            }
        }
        return slots;
    };

    const dates = getHebrewDates();
    const [isOpen, setIsOpen] = useState(false)
    const timeSlots = getTimeSlots();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [showAllDates, setShowAllDates] = useState(false);
    const { "*": name } = useParams();
    const { businesses } = useBusinesses()




    return (
        <BarberPage getHebrewDates={getHebrewDates} getTimeSlots={getTimeSlots} dates={dates} timeSlots={timeSlots} selectedDate={selectedDate} setSelectedDate={setSelectedDate} isOpen={isOpen} setIsOpen={setIsOpen} showAllDates={showAllDates} setShowAllDates={setShowAllDates} name={name} businesses={businesses} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
    )
}

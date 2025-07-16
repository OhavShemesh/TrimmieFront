import React, { useEffect, useMemo, useRef, useState } from 'react';
import BusinessBoard from '../BusinessBoard';
import useUsers from '../../helpers/hooks/useUsers';
import useAppointments from '../../helpers/hooks/useAppointments';
import useBusinesses from '../../helpers/hooks/useBusinesses';

export default function BusinessBoardManager() {
    const [appointments, setAppointments] = useState([]);
    const { isAdmin, isConnected, connectedUser } = useUsers();
    const { getAllBusinessAppointmentsByBusinessId } = useAppointments();
    const { business, updateAvailableAppointments } = useBusinesses();
    const [workingHoursSelectedDate, setWorkingHoursSelectedDate] = useState("");
    const [workingHoursByDate, setWorkingHoursByDate] = useState({});
    const [appointmentsSelectedDate, setAppointmentsSelectedDate] = useState("");
    const [showSlots, setShowSlots] = useState(true);
    const initializedRef = useRef(false);

    const formatTime = (hour, minute) => `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

    const createTimeSlots = (startHour = 9, endHour = 17, stepMinutes = 10) => {
        const slots = [];
        for (let hour = startHour; hour < endHour; hour++) {
            for (let min = 0; min < 60; min += stepMinutes) {
                slots.push(formatTime(hour, min));
            }
        }
        return slots;
    };
    const ALL_SLOTS = useMemo(() => createTimeSlots(9, 17), []);

    const createNextWeekDates = () => {
        const dates = [];
        const today = new Date();
        let i = 0;

        while (dates.length < 7) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

            if (dayOfWeek !== 1 && dayOfWeek !== 6) { // Skip Monday (1) and Saturday (6)
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();
                dates.push(`${day}.${month}.${year}`);
            }

            i++; // Move to the next day
        }

        return dates;
    };
    const weekDates = useMemo(() => createNextWeekDates(), []);


    // Generate time slots from business working hours
    const generateTimeSlots = () => {
        const { openingHour, closingHour } = business.workingHours[0];
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

    const sortTimeSlots = (slots) => {
        return [...slots].sort((a, b) => {
            const [aH, aM] = a.split(":").map(Number);
            const [bH, bM] = b.split(":").map(Number);
            return aH !== bH ? aH - bH : aM - bM;
        });
    };

    // Generate the next 7 dates in DD.MM.YYYY format
    const generateNextSevenDates = () => {
        const today = new Date();
        return Array.from({ length: 7 }, (_, i) => {
            const dateObj = new Date(today);
            dateObj.setDate(today.getDate() + i);
            const day = String(dateObj.getDate()).padStart(2, "0");
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const year = dateObj.getFullYear();
            return `${day}.${month}.${year}`;
        });
    };

    // Initialize slots and selected date when business data loads
    const initializeWorkingHours = () => {
        if (!business?.workingHours?.length) return;

        const ALL_SLOTS = generateTimeSlots();
        const dates = generateNextSevenDates(); // Must return dates like "02.07.2025"

        setWorkingHoursByDate((prev) => {
            const updated = { ...prev };

            dates.forEach((date) => {
                if (!updated[date]) {
                    const appointment = business.availableAppointments?.find(
                        (entry) => entry.date === date
                    );
                    updated[date] = appointment ? appointment.times : [...ALL_SLOTS];
                }
            });

            return updated;
        });

        if (!workingHoursSelectedDate && dates.length > 0) {
            setWorkingHoursSelectedDate(dates[0]);
        }
    };


    const availableSlots = useMemo(
        () => workingHoursByDate[workingHoursSelectedDate] || [],
        [workingHoursByDate, workingHoursSelectedDate]
    );

    const unavailableSlots = useMemo(
        () => ALL_SLOTS.filter((slot) => !availableSlots.includes(slot)),
        [ALL_SLOTS, availableSlots]
    );

    const uniqueDates = useMemo(() => {
        const dates = appointments.map((a) => a.scheduledAt.split(" ")[0]);
        const unique = [...new Set(dates)];
        return unique.sort((a, b) => {
            const [d1, m1, y1] = a.split(".").map(Number);
            const [d2, m2, y2] = b.split(".").map(Number);
            return new Date(y1, m1 - 1, d1) - new Date(y2, m2 - 1, d2);
        });
    }, [appointments]);

    useEffect(() => {
        if (uniqueDates.length) {
            if (!appointmentsSelectedDate) setAppointmentsSelectedDate(uniqueDates[0]);
            if (!workingHoursSelectedDate) setWorkingHoursSelectedDate(weekDates[0]);
        }
    }, [uniqueDates, weekDates]);

    const filteredAppointments = useMemo(
        () => appointments.filter((a) => a.scheduledAt.startsWith(appointmentsSelectedDate)),
        [appointments, appointmentsSelectedDate]
    );

    const handleDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) return;

        setWorkingHoursByDate((prev) => {
            const current = prev[workingHoursSelectedDate] || [];

            if (source.droppableId === "free" && destination.droppableId === "selected") {
                const updated = [...current, draggableId];
                return {
                    ...prev,
                    [workingHoursSelectedDate]: sortTimeSlots(updated),
                };
            }

            if (source.droppableId === "selected" && destination.droppableId === "free") {
                const updated = current.filter((slot) => slot !== draggableId);
                return {
                    ...prev,
                    [workingHoursSelectedDate]: sortTimeSlots(updated),
                };
            }

            return prev;
        });
    };

    // Fetch all business appointments for the connected user
    const fetchBusinessAppointments = async () => {
        if (!connectedUser?.businessId) return;
        const response = await getAllBusinessAppointmentsByBusinessId(connectedUser.businessId);
        setAppointments(response);
    };

    // Update the available slots for a specific date
    const updateAvailableSlotsForDate = (date, slots) => {
        setWorkingHoursByDate((prev) => ({
            ...prev,
            [date]: slots,
        }));
    };

    // Save available slots to the backend
    const saveAvailableAppointments = async (date, times) => {
        if (!business?._id || !date) return;
        try {
            await updateAvailableAppointments({
                date,
                times: times || [],
            });
        } catch (err) {
            console.error("Failed to update available appointments", err);
        }
    };

    // Effects
    useEffect(() => {
        initializeWorkingHours();
    }, [business]);

    useEffect(() => {
        fetchBusinessAppointments();
    }, [connectedUser]);

    return (
        <BusinessBoard
            isUserConnected={isConnected}
            isUserAdmin={isAdmin}
            connectedUser={connectedUser}
            workingHoursByDate={workingHoursByDate}
            workingHoursSelectedDate={workingHoursSelectedDate}
            setWorkingHoursSelectedDate={setWorkingHoursSelectedDate}
            onSave={saveAvailableAppointments}
            setAvailableSlotsForDate={updateAvailableSlotsForDate}
            appointmentsSelectedDate={appointmentsSelectedDate}
            showSlots={showSlots}
            setShowSlots={setShowSlots}
            weekDates={weekDates}
            setAppointmentsSelectedDate={setAppointmentsSelectedDate}
            handleDragEnd={handleDragEnd}
            uniqueDates={uniqueDates}
            filteredAppointments={filteredAppointments}
            unavailableSlots={unavailableSlots}
            availableSlots={availableSlots}
        />
    );
}

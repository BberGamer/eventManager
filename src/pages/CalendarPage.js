// src/pages/CalendarPage.js
import React, { useEffect, useState } from 'react';
import WeeklyCalendarView from '../components/WeeklyCalendarView';
import './CalendarPage.css';

const CalendarPage = () => {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) return;

            const response = await fetch(`http://localhost:3001/events?userId=${user.id}`);
            const data = await response.json();

            // Format lại để truyền vào lịch
            const formatted = data.map(e => ({
                ...e,
                title: e.title,
                start: new Date(`${e.date}T${e.startTime}`),
                end: new Date(`${e.date}T${e.endTime}`)
            }));

            setEvents(formatted);
        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="calendar-container">
            <WeeklyCalendarView events={events} />
        </div>
    );
};

export default CalendarPage;

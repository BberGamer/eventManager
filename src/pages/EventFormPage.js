// src/pages/EventFormPage.js
import React, { useState, useEffect } from 'react';
import EventForm from '../components/EventForm';
import { Container, Alert } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

const EventFormPage = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const [eventToEdit, setEventToEdit] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchEventById = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/events/${id}`);
            const data = await response.json();
            setEventToEdit(data);
        } catch (error) {
            console.error('Lỗi khi tải sự kiện:', error);
        }
    };

    useEffect(() => {
        const id = params.get('id');
        if (id) {
            fetchEventById(id);
        }
    }, [params]);

    const handleSubmit = async (event) => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (event.id) {
            // Cập nhật
            await fetch(`http://localhost:3001/events/${event.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...event, userId: user.id }) // Thêm userId khi update
            });
        } else {
            const { id, ...eventWithoutId } = event;
            await fetch('http://localhost:3001/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...eventWithoutId, userId: user.id }) // 👈 Thêm userId
            });
        }

        setSuccessMessage('🎉 Sự kiện đã được lưu thành công!');
        setTimeout(() => {
            navigate('/app/events');
        }, 1500);
    };


    return (
        <Container className="pt-5" >
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            <EventForm eventToEdit={eventToEdit} onSubmit={handleSubmit} onCancel={() => navigate('/app/events')} />
        </Container>
    );
};

export default EventFormPage;

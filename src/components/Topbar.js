// src/layout/Topbar.js
import React, { useEffect, useState, useRef } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { BsPersonCircle, BsBellFill } from 'react-icons/bs';
import './topbar.css';

const Topbar = ({ hideSidebar }) => {
    const [reminders, setReminders] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();


    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const checkReminders = async () => {
            try {
                const response = await fetch('http://localhost:3001/events');
                const data = await response.json();
                const now = new Date();

                const upcoming = data.filter(event => {
                    const eventDateTime = new Date(`${event.date}T${event.startTime}`);
                    const reminderMinutes = parseInt(event.reminder, 10) || 0;
                    const diff = (eventDateTime - now) / (1000 * 60);
                    return (
                        event.userId === user?.id &&
                        diff > 0 && diff <= reminderMinutes
                    );
                });

                setReminders(upcoming);
            } catch (error) {
                console.error('Lỗi khi kiểm tra reminder:', error);
            }
        };

        checkReminders();
        const interval = setInterval(checkReminders, 60000);
        return () => clearInterval(interval);
    }, [user?.id]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <Navbar bg="white" expand="lg" className="topbar-navbar shadow-sm px-3">
            <Container fluid className="d-flex justify-content-between align-items-center">
                <Navbar.Brand className="fw-bold text-primary">Hello! UᵔᴥᵔU</Navbar.Brand>

                <div className="d-flex align-items-center gap-3">
                    {/* Thông báo */}
                    <div className="notification-wrapper position-relative" ref={dropdownRef}>
                        <BsBellFill
                            size={20}
                            className={`cursor-pointer ${reminders.length > 0 ? 'text-danger' : 'text-secondary'}`}
                            title="Thông báo"
                            onClick={() => setShowDropdown(!showDropdown)}
                        />

                        {showDropdown && (
                            <div className="notification-dropdown">
                                <h6 className="fw-bold mb-2">Sự kiện sắp diễn ra</h6>
                                {reminders.length === 0 ? (
                                    <p className="text-muted small mb-0">Không có sự kiện nào sắp tới.</p>
                                ) : (
                                    <ul className="list-unstyled mb-0">
                                        {reminders.map(event => (
                                            <li key={event.id} className="mb-2">
                                                <strong>{event.title}</strong><br />
                                                <small className="text-muted">
                                                    📅 {event.date} 🕒 {event.startTime} → {event.endTime}
                                                </small><br />
                                                {event.description && <small>{event.description}</small>}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Tên người dùng */}
                    {user && (
                        <div className="d-flex align-items-center gap-2">
                            <BsPersonCircle size={22} className="text-secondary" />
                            <span className="fw-medium">{user.name}</span>
                        </div>
                    )}
                </div>
            </Container>
        </Navbar>
    );
};

export default Topbar;

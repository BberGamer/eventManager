import React, { useEffect, useState } from 'react';
import EventList from '../components/EventList';
import { Container, Row, Col } from 'react-bootstrap';
import './EventDashboard.css';


const EventDashboard = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage, setEventsPerPage] = useState(6);
    const [search, setSearch] = useState('');
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => {
        fetchEvents();
        calculateEventsPerPage();
        window.addEventListener('resize', calculateEventsPerPage);
        return () => window.removeEventListener('resize', calculateEventsPerPage);
    }, []);

    const calculateEventsPerPage = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1200) setEventsPerPage(12);
        else if (screenWidth >= 992) setEventsPerPage(9);
        else if (screenWidth >= 768) setEventsPerPage(6);
        else setEventsPerPage(4);
    };

    const fetchEvents = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) return;

            const response = await fetch(`http://localhost:3001/events?userId=${user.id}`);
            const data = await response.json();

            const sorted = data.sort((a, b) => {
                const dateTimeA = new Date(`${a.date}T${a.startTime || a.time}`);
                const dateTimeB = new Date(`${b.date}T${b.startTime || b.time}`);
                return dateTimeA - dateTimeB;
            });

            setEvents(sorted);
        } catch (error) {
            console.error('Lỗi khi fetch dữ liệu:', error);
        }
    };

    // 👉 Toggle trạng thái hoàn thành
    const handleToggleComplete = async (event) => {
        try {
            await fetch(`http://localhost:3001/events/${event.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: !event.completed }),
            });
            fetchEvents(); // refresh lại danh sách
        } catch (error) {
            console.error('Lỗi cập nhật trạng thái hoàn thành:', error);
        }
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:3001/events/${id}`, {
            method: 'DELETE',
        });
        fetchEvents();
    };

    const handleEdit = (event) => {
        window.location.href = `/app/add?id=${event.id}`;
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredEvents = events.filter(event => {
        const matchesTitle = event.title.toLowerCase().includes(search.toLowerCase());
        const matchesDate = filterDate ? event.date === filterDate : true;
        return matchesTitle && matchesDate;
    });

    const shouldPaginate = !search && !filterDate;

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const paginatedEvents = shouldPaginate
        ? filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent)
        : filteredEvents;

    const totalPages = shouldPaginate
        ? Math.ceil(filteredEvents.length / eventsPerPage)
        : 1;

    return (
        <>
            <Container>
                <Row className="mb-3">
                    <Col><h3>Quản lý sự kiện</h3></Col>
                </Row>

                <EventList
                    events={paginatedEvents}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onToggleComplete={handleToggleComplete} // 👈 Thêm dòng này
                    search={search}
                    setSearch={setSearch}
                    filterDate={filterDate}
                    setFilterDate={setFilterDate}
                />
            </Container>

            {shouldPaginate && filteredEvents.length > 0 && (
                <div className="fixed-pagination">
                    {Array.from({ length: totalPages }, (_, idx) => (
                        <button
                            key={idx}
                            className={`btn mx-1 ${currentPage === idx + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => handlePageChange(idx + 1)}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
};

export default EventDashboard;

import React from 'react';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import EventItem from './EventItem';

const EventList = ({
    events,
    onDelete,
    onEdit,
    search,
    setSearch,
    filterDate,
    setFilterDate,
    onToggleComplete, // 👈 Thêm prop mới
}) => {
    const user = JSON.parse(localStorage.getItem('user'));

    // Lọc theo userId, tên sự kiện và ngày
    const filteredEvents = events.filter(event => {
        const matchesUser = event.userId === user?.id;
        const matchesSearch = search ? event.title.toLowerCase().includes(search.toLowerCase()) : true;
        const matchesDate = filterDate ? event.date === filterDate : true;
        return matchesUser && matchesSearch && matchesDate;
    });

    return (
        <div>
            <Row className="mb-4">
                <Col md={6}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="🔍 Tìm theo tên sự kiện..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {search && (
                            <Button variant="outline-secondary" onClick={() => setSearch('')}>X</Button>
                        )}
                    </InputGroup>
                </Col>
                <Col md={6}>
                    <InputGroup>
                        <Form.Control
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                        />
                        {filterDate && (
                            <Button variant="outline-secondary" onClick={() => setFilterDate('')}>X</Button>
                        )}
                    </InputGroup>
                </Col>
            </Row>

            {filteredEvents.length === 0 ? (
                <p className="text-muted text-center">🚫 Không có sự kiện nào phù hợp.</p>
            ) : (
                <Row className="g-4">
                    {filteredEvents.map((event) => (
                        <Col key={event.id} xs={12} sm={6} md={4} lg={3}>
                            <EventItem
                                event={event}
                                onDelete={onDelete}
                                onEdit={onEdit}
                                onToggleComplete={onToggleComplete} // 👈 Truyền thêm vào
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default EventList;

import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import './EventItem.css';

const EventItem = ({ event, onEdit, onDelete, onToggleComplete }) => {
    return (
        <Card className="shadow-sm h-100 event-card">
            <Card.Body>
                <Card.Title className="fw-bold d-flex justify-content-between align-items-center">
                    {event.title}
                    {event.completed && (
                        <Badge bg="success" pill>Đã hoàn thành</Badge>
                    )}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    📅 {event.date} &nbsp;&nbsp;
                    🕒 {event.startTime} → {event.endTime}
                </Card.Subtitle>
                <Card.Text>
                    {event.description || <em>Không có mô tả</em>}
                </Card.Text>

                <div className="d-flex justify-content-end gap-2">
                    <Button
                        variant={event.completed ? 'warning' : 'success'}
                        size="sm"
                        onClick={() => onToggleComplete(event)}
                    >
                        {event.completed ? 'Đánh dấu chưa hoàn thành' : 'Hoàn thành'}
                    </Button>
                    <Button variant="outline-primary" size="sm" onClick={() => onEdit(event)}>Sửa</Button>
                    <Button variant="outline-danger" size="sm" onClick={() => onDelete(event.id)}>Xóa</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default EventItem;

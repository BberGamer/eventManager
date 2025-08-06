// src/components/EventForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

const EventForm = ({ eventToEdit, onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [reminder, setReminder] = useState('');

    useEffect(() => {
        if (eventToEdit) {
            setTitle(eventToEdit.title || '');
            setDescription(eventToEdit.description || '');
            setDate(eventToEdit.date || '');
            setStartTime(eventToEdit.startTime || eventToEdit.time || '');
            setEndTime(eventToEdit.endTime || '');
            setReminder(eventToEdit?.reminder || '');
        } else {
            setTitle('');
            setDescription('');
            setDate('');
            setStartTime('');
            setEndTime('');
        }
    }, [eventToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !date || !startTime || !endTime) {
            alert('Vui lòng điền đầy đủ các trường bắt buộc.');
            return;
        }

        const now = new Date();

        // Tạo đối tượng Date cho ngày diễn ra
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Kiểm tra ngày không được trong quá khứ
        if (selectedDate < today) {
            alert('Không được chọn ngày trong quá khứ!');
            return;
        }

        // Tạo Date cho startTime
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const startDateTime = new Date(date);
        startDateTime.setHours(startHour, startMinute, 0, 0);

        // Kiểm tra thời gian bắt đầu không được trong quá khứ
        if (startDateTime < now) {
            alert('Không được chọn thời gian bắt đầu trong quá khứ!');
            return;
        }

        // Tạo Date cho endTime
        const [endHour, endMinute] = endTime.split(':').map(Number);
        const endDateTime = new Date(date);
        endDateTime.setHours(endHour, endMinute, 0, 0);

        // Kiểm tra thời gian kết thúc phải sau thời gian bắt đầu
        if (endDateTime <= startDateTime) {
            alert('Thời gian kết thúc phải sau thời gian bắt đầu!');
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (!currentUser) {
            alert('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
            return;
        }

        const eventData = {
            id: eventToEdit ? eventToEdit.id : null,
            title,
            description,
            date,
            time: startTime,
            startTime,
            endTime,
            reminder: parseInt(reminder) || 0,
            userId: eventToEdit?.userId || currentUser.id
        };

        onSubmit(eventData);

        // Reset form sau khi lưu
        setTitle('');
        setDescription('');
        setDate('');
        setStartTime('');
        setEndTime('');
        setReminder('');
    };




    return (
        <Card className="p-4 shadow-sm rounded-4 border-0">
            <h4 className="mb-4">{eventToEdit ? 'Chỉnh sửa sự kiện' : 'Thêm sự kiện mới'}</h4>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Tên sự kiện</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Tên sự kiện"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="fs-5 py-2"
                        required
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Ngày diễn ra</Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Giờ bắt đầu</Form.Label>
                            <Form.Control
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Giờ kết thúc</Form.Label>
                            <Form.Control
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Nhắc tôi trước (phút)</Form.Label>
                    <Form.Control
                        type="number"
                        value={reminder}
                        onChange={(e) => setReminder(e.target.value)}
                        min="0"
                        placeholder="VD: 5"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mô tả sự kiện (tùy chọn)</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Mô tả sự kiện"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={onCancel}>Hủy</Button>
                    <Button variant="primary" type="submit">{eventToEdit ? 'Cập nhật' : 'Lưu'}</Button>
                </div>
            </Form>
        </Card>
    );
};

export default EventForm;

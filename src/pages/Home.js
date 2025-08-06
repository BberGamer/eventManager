import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Home.css';

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [todayEvents, setTodayEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    const [thisMonthHours, setThisMonthHours] = useState(0);
    const [lastMonthHours, setLastMonthHours] = useState(0);
    const [hourDifference, setHourDifference] = useState(0);

    const today = new Date().toISOString().slice(0, 10);
    const user = JSON.parse(localStorage.getItem('user'));

    const calculateTotalHours = (events, year, month) => {
        let totalMinutes = 0;
        events.forEach(event => {
            const eventDate = new Date(event.date);
            if (eventDate.getFullYear() === year && eventDate.getMonth() + 1 === month) {
                const start = new Date(`1970-01-01T${event.startTime || event.time}`);
                const end = new Date(`1970-01-01T${event.endTime || event.time}`);
                const duration = (end - start) / (1000 * 60); // phút
                totalMinutes += duration;
            }
        });
        return +(totalMinutes / 60).toFixed(2); // giờ
    };

    const fetchEvents = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3001/events');
            const data = await response.json();

            const userEvents = data.filter(e => e.userId === user?.id);

            const sorted = userEvents.sort((a, b) => {
                const dateTimeA = new Date(`${a.date}T${a.startTime || a.time}`);
                const dateTimeB = new Date(`${b.date}T${b.startTime || b.time}`);
                return dateTimeA - dateTimeB;
            });

            const todayList = sorted.filter(e => e.date === today);
            const upcoming = sorted.filter(e => {
                const date = new Date(e.date);
                const now = new Date();
                return date >= now && date <= new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
            });

            // Tháng hiện tại và tháng trước
            const now = new Date();
            const thisMonth = now.getMonth() + 1;
            const lastMonth = thisMonth === 1 ? 12 : thisMonth - 1;
            const yearThis = now.getFullYear();
            const yearLast = thisMonth === 1 ? yearThis - 1 : yearThis;

            const hoursThis = calculateTotalHours(userEvents, yearThis, thisMonth);
            const hoursLast = calculateTotalHours(userEvents, yearLast, lastMonth);

            setEvents(sorted);
            setTodayEvents(todayList);
            setUpcomingEvents(upcoming);
            setThisMonthHours(hoursThis);
            setLastMonthHours(hoursLast);
            setHourDifference(hoursThis - hoursLast);
        } catch (error) {
            console.error('Lỗi khi tải sự kiện:', error);
        }
    }, [user?.id, today]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const chartData = Array.from({ length: 7 }).map((_, i) => {
        const day = new Date();
        day.setDate(day.getDate() + i);
        const dateStr = day.toISOString().slice(0, 10);
        const count = events.filter(e => e.date === dateStr).length;
        return {
            name: day.toLocaleDateString('vi-VN', { weekday: 'short' }),
            SốSựKiện: count
        };
    });

    return (
        <Container className="py-4">
            <Row className="g-4 mb-4">
                <Col md={4}>
                    <Card className="text-white gradient-blue p-3 rounded-4 shadow">
                        <Card.Body>
                            <Card.Title className="fs-4">Tổng số sự kiện</Card.Title>
                            <Card.Text className="fs-2 fw-bold">{events.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="text-white gradient-purple p-3 rounded-4 shadow">
                        <Card.Body>
                            <Card.Title className="fs-4">Sự kiện hôm nay</Card.Title>
                            <Card.Text className="fs-2 fw-bold">{todayEvents.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="text-white gradient-green p-3 rounded-4 shadow">
                        <Card.Body>
                            <Card.Title className="fs-4">Tạo sự kiện mới</Card.Title>
                            <Button href="/app/add" variant="light" className="fw-bold mt-2">
                                ➕ Thêm mới
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={8}>
                    <Card className="p-4 shadow rounded-4">
                        <h5 className="mb-3">📊 Biểu đồ số sự kiện 7 ngày tới</h5>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', fontSize: '14px' }}
                                    cursor={{ fill: '#f5f5f5' }}
                                />
                                <Bar dataKey="SốSựKiện" fill="url(#gradient)" radius={[10, 10, 0, 0]}>
                                    <LabelList dataKey="SốSựKiện" position="top" fill="#333" />
                                </Bar>
                                <defs>
                                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#0d6efd" stopOpacity={0.8} />
                                        <stop offset="100%" stopColor="#0d6efd" stopOpacity={0.4} />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="p-3 shadow rounded-4">
                        <h5>🗓️ Lịch tháng</h5>
                        <Calendar className="border-0 rounded shadow-sm mb-4" />
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={12}>
                    <Card className="p-4 shadow-sm rounded-4">
                        <h5 className="mb-3">📈 So sánh thời gian sự kiện</h5>
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart
                                data={[
                                    { name: 'Tháng trước', ThờiGian: lastMonthHours },
                                    { name: 'Tháng này', ThờiGian: thisMonthHours },
                                ]}
                                margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis unit=" giờ" allowDecimals={false} />
                                <Tooltip />
                                <Bar dataKey="ThờiGian" fill="#6f42c1" radius={[10, 10, 0, 0]}>
                                    <LabelList dataKey="ThờiGian" position="top" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                        <p>
                            Tổng thời gian sự kiện tháng này: <strong>{thisMonthHours} giờ</strong><br />
                            Tổng thời gian sự kiện tháng trước: <strong>{lastMonthHours} giờ</strong><br />
                            {hourDifference > 0 ? (
                                <span className="text-success">⬆️ Tăng {hourDifference} giờ so với tháng trước</span>
                            ) : hourDifference < 0 ? (
                                <span className="text-danger">⬇️ Giảm {Math.abs(hourDifference)} giờ so với tháng trước</span>
                            ) : (
                                <span className="text-muted">⏸️ Không thay đổi so với tháng trước</span>
                            )}
                        </p>
                    </Card>
                </Col>
            </Row>

            <Row className="mb-4">
                <h5 className="mb-3">Sự kiện sắp diễn ra</h5>
                {upcomingEvents.length === 0 ? (
                    <p className="text-muted">Không có sự kiện nào sắp tới.</p>
                ) : (
                    upcomingEvents.slice(0, 4).map(event => (
                        <Col key={event.id} md={3}>
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Body>
                                    <Card.Title className="fs-6">{event.title}</Card.Title>
                                    <Card.Text className="mb-1">📅 {event.date}</Card.Text>
                                    <Card.Text>🕒 {event.startTime} → {event.endTime}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
};

export default HomePage;

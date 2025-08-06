import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Topbar from '../components/Topbar';
import './WelcomePage.css';

const WelcomePage = () => {
    return (
        <>
            <Topbar hideSidebar={true} />

            <div className="welcome-hero text-center text-white d-flex align-items-center">
                <Container>
                    <h1 className="display-3 fw-bold mb-4">Calendar</h1>
                    <p className="lead mb-5">
                        Quản lý sự kiện, công việc và lịch trình của bạn một cách thông minh và hiệu quả!
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/login">
                            <Button variant="light" size="lg">Đăng nhập</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="outline-light" size="lg">Đăng ký</Button>
                        </Link>
                    </div>
                </Container>
            </div>

            <section className="features-section py-5">
                <Container>
                    <Row className="text-center mb-4">
                        <h2 className="fw-bold">Tại sao nên chọn EventSys?</h2>
                        <p>Trải nghiệm tiện ích hiện đại, dễ sử dụng và hiệu quả trong việc quản lý lịch trình cá nhân.</p>
                    </Row>
                    <Row className="g-4">
                        <Col md={4} className="text-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/3050/3050525.png" alt="Event" className="feature-icon" />
                            <h5 className="mt-3">Tạo và quản lý sự kiện</h5>
                            <p>Thiết lập nhanh chóng, chỉnh sửa dễ dàng.</p>
                        </Col>
                        <Col md={4} className="text-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png" alt="Calendar View" className="feature-icon" />
                            <h5 className="mt-3">Xem lịch rõ ràng</h5>
                            <p>Hiển thị sự kiện theo tuần, tháng hoặc ngày.</p>
                        </Col>
                        <Col md={4} className="text-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" alt="User Friendly" className="feature-icon" />
                            <h5 className="mt-3">Giao diện thân thiện</h5>
                            <p>Dễ dàng sử dụng cho mọi đối tượng người dùng.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default WelcomePage;

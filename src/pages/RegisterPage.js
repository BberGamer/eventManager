import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Alert
} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:3001/users?email=${email}`);
        const existingUsers = await res.json();

        if (existingUsers.length > 0) {
            setError('Email đã được sử dụng!');
            return;
        }

        const newUser = { name, email, password };

        await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        setSuccess(true);
        setTimeout(() => navigate('/login'), 1500);
    };

    return (
        <section className="bg-light min-vh-100 d-flex align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <Card className="shadow-lg border-0 rounded-4">
                            <Card.Body className="p-4">
                                <h3 className="text-center fw-bold">Sign up</h3>
                                <p className="text-center text-muted mb-4">Create your account</p>

                                {error && <Alert variant="danger">{error}</Alert>}
                                {success && <Alert variant="success">Đăng ký thành công! Chuyển hướng...</Alert>}

                                <Form onSubmit={handleRegister}>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Full Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="rounded-3"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="rounded-3"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="rounded-3"
                                        />
                                    </Form.Group>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-100 py-2 rounded-3 border-0"
                                        style={{
                                            background: 'linear-gradient(to right, #00c6ff, #0072ff)'
                                        }}
                                    >
                                        SIGN UP
                                    </Button>
                                </Form>

                                <hr className="my-4" />

                                <p className="text-center text-muted">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-primary fw-semibold">
                                        Sign in
                                    </Link>
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default RegisterPage;

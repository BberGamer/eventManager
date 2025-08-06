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

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:3001/users?email=${email}&password=${password}`);
        const users = await res.json();
        if (users.length === 0) {
            setError('Email hoặc mật khẩu không đúng!');
            return;
        }
        localStorage.setItem('user', JSON.stringify(users[0]));
        navigate('/app');
    };

    return (
        <section className="bg-light min-vh-100 d-flex align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <Card className="shadow-lg border-0 rounded-4">
                            <Card.Body className="p-4">
                                <h3 className="text-center fw-bold">Sign in</h3>
                                <p className="text-center text-muted mb-4">Welcome back</p>

                                {error && <Alert variant="danger">{error}</Alert>}

                                <Form onSubmit={handleLogin}>
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

                                    <div className="d-flex align-items-center mb-3">
                                        <Form.Check type="switch" id="remember-me" label="Remember me" />
                                    </div>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="w-100 py-2 rounded-3 border-0"
                                        style={{
                                            background: 'linear-gradient(to right, #00c6ff, #0072ff)'
                                        }}
                                    >
                                        SIGN IN
                                    </Button>
                                </Form>

                                <hr className="my-4" />

                                <p className="text-center text-muted">
                                    Don't have an account?{' '}
                                    <Link to="/register" className="text-primary fw-semibold">
                                        Sign up
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

export default LoginPage;

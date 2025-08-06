// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import EventDashboard from './pages/EventDashboard';
import CalendarPage from './pages/CalendarPage';
import EventFormPage from './pages/EventFormPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/app" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Home />} />
          <Route path="/app/events" element={<EventDashboard />} />
          <Route path="/app/calendar" element={<CalendarPage />} />
          <Route path="/app/add" element={<EventFormPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

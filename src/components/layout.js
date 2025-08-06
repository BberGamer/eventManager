// src/layout/Layout.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';
import './layout.css';

const Layout = () => {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    return (
        <div className="layout-wrapper">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
                <div className="topbar-wrapper">
                    <Topbar />
                </div>

                <div className="page-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;

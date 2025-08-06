import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
    BsCalendar2Week,
    BsClipboardCheck,
    BsPlusCircle,
    BsChevronLeft,
    BsChevronRight, BsHouseDoor,
    BsBoxArrowRight
} from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';
import './sidebar.css';

const Sidebar = ({ collapsed, setCollapsed }) => {
    const toggleSidebar = () => setCollapsed(!collapsed);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className={`sidebar d-flex flex-column ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header d-flex justify-content-between align-items-center mb-2 pb-2 px-3 py-2">
                {!collapsed && <Link to="/app" className="text-primary fw-bold mb-0 text-decoration-none h5">
                    Calendar
                </Link>}
                <div className="d-flex justify-content-center my-2">
                    <button
                        onClick={toggleSidebar}
                        className="btn btn-sm btn-outline-secondary"
                    >
                        {collapsed ? <BsChevronRight size="20" /> : <BsChevronLeft size="20" />}
                    </button>
                </div>
            </div>

            <Nav className="flex-column gap-2 px-2">
                <NavLink
                    to="/app"
                    end
                    className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
                    }
                >
                    <BsHouseDoor />
                    {!collapsed && 'Home'}
                </NavLink>
                <NavLink
                    to="/app/events"
                    className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
                    }
                >
                    <BsClipboardCheck />
                    {!collapsed && 'Quản lý sự kiện'}
                </NavLink>

                <NavLink
                    to="/app/calendar"
                    className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
                    }
                >
                    <BsCalendar2Week />
                    {!collapsed && 'Lịch sự kiện'}
                </NavLink>

                <NavLink
                    to="/app/add"
                    className={({ isActive }) =>
                        `nav-link d-flex align-items-center gap-2 ${isActive ? 'active' : ''}`
                    }
                >
                    <BsPlusCircle />
                    {!collapsed && 'Thêm mới'}
                </NavLink>

                <Button
                    variant="link"
                    onClick={handleLogout}
                    className="nav-link d-flex align-items-center gap-2 text-start text-danger"
                    style={{ paddingLeft: collapsed ? '0.5rem' : '1rem' }}
                >
                    <BsBoxArrowRight />
                    {!collapsed && 'Đăng xuất'}
                </Button>
            </Nav>

            {!collapsed && (
                <div className="mt-auto small text-muted text-center px-2 pb-2">© 2025 EventSys</div>
            )}
        </div>
    );
};

export default Sidebar;
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const initials = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="app-navbar">
      {/* Brand */}
      <a className="navbar-brand-custom" href="/dashboard">
        <div className="brand-icon">
          <i className="bi bi-briefcase-fill"></i>
        </div>
        <span>JobTracker</span>
      </a>

      {/* Nav Links */}
      <div className="navbar-nav-custom">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            'nav-link-custom' + (isActive ? ' active' : '')
          }
        >
          <i className="bi bi-speedometer2"></i>
          Dashboard
        </NavLink>
        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            'nav-link-custom' + (isActive ? ' active' : '')
          }
        >
          <i className="bi bi-list-ul"></i>
          Applications
        </NavLink>
        <NavLink
          to="/jobs/add"
          className={({ isActive }) =>
            'nav-link-custom' + (isActive ? ' active' : '')
          }
        >
          <i className="bi bi-plus-circle"></i>
          Add New
        </NavLink>
      </div>

      {/* User + Logout */}
      <div className="navbar-user">
        <div className="user-avatar">{initials}</div>
        <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', fontWeight: 500 }}>
          {user.name}
        </span>
        <button className="btn-logout" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

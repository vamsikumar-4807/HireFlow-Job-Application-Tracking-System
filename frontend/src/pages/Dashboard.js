import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboard, getAllJobs } from '../services/api';
import StatusBadge from '../components/StatusBadge';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [stats, setStats]   = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, jobsRes] = await Promise.all([getDashboard(), getAllJobs()]);
        setStats(dashRes.data.data);
        // Show latest 5 applications
        const sorted = [...(jobsRes.data.data || [])].sort(
          (a, b) => new Date(b.applicationDate) - new Date(a.applicationDate)
        );
        setRecent(sorted.slice(0, 5));
      } catch {
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { key: 'total',     label: 'Total Applications', value: stats?.totalApplications, icon: 'bi-briefcase',        cls: 'total' },
    { key: 'applied',   label: 'Applied',             value: stats?.appliedCount,      icon: 'bi-send',             cls: 'applied' },
    { key: 'interview', label: 'Interviews',          value: stats?.interviewCount,    icon: 'bi-calendar-check',   cls: 'interview' },
    { key: 'selected',  label: 'Selected',            value: stats?.selectedCount,     icon: 'bi-check-circle',     cls: 'selected' },
    { key: 'rejected',  label: 'Rejected',            value: stats?.rejectedCount,     icon: 'bi-x-circle',         cls: 'rejected' },
  ];

  if (loading) {
    return (
      <div className="spinner-wrap">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-container fade-in">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">
          👋 Welcome back, {user.name}!
        </h1>
        <p className="page-subtitle">Here's a summary of your job search journey.</p>
      </div>

      {error && (
        <div className="alert-custom error">
          <i className="bi bi-exclamation-circle-fill"></i> {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="stats-grid">
        {statCards.map((card) => (
          <div key={card.key} className={`stat-card ${card.cls}`}>
            <div className="stat-icon">
              <i className={`bi ${card.icon}`}></i>
            </div>
            <div className="stat-number">{card.value ?? 0}</div>
            <div className="stat-label">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="table-card">
        <div className="table-card-header">
          <span className="table-card-title">
            <i className="bi bi-clock-history me-2" style={{ color: 'var(--primary)' }}></i>
            Recent Applications
          </span>
          <Link to="/jobs" className="btn-primary-custom">
            <i className="bi bi-list-ul"></i>
            View All
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-inbox"></i>
            <h5>No applications yet</h5>
            <p>Start by adding your first job application!</p>
            <br />
            <Link to="/jobs/add" className="btn-primary-custom" style={{ margin: '0 auto' }}>
              <i className="bi bi-plus-circle"></i> Add Application
            </Link>
          </div>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Location</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((job) => (
                <tr key={job.id}>
                  <td>
                    <div className="company-cell">
                      <div className="company-avatar">
                        {job.companyName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="company-name">{job.companyName}</div>
                        <div className="company-role">{job.jobRole}</div>
                      </div>
                    </div>
                  </td>
                  <td>{job.location || '—'}</td>
                  <td>{job.applicationDate}</td>
                  <td><StatusBadge status={job.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

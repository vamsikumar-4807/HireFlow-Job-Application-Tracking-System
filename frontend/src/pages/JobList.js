import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllJobs, deleteJob, searchByCompany, filterByStatus } from '../services/api';
import StatusBadge from '../components/StatusBadge';

const STATUSES = ['ALL', 'APPLIED', 'INTERVIEW_SCHEDULED', 'SELECTED', 'REJECTED'];

const STATUS_LABELS = {
  ALL: 'All Statuses',
  APPLIED: 'Applied',
  INTERVIEW_SCHEDULED: 'Interview Scheduled',
  SELECTED: 'Selected',
  REJECTED: 'Rejected',
};

const JobList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState('ALL');
  const [deleting, setDeleting] = useState(null);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      let res;
      if (search.trim()) {
        res = await searchByCompany(search.trim());
      } else if (filter !== 'ALL') {
        res = await filterByStatus(filter);
      } else {
        res = await getAllJobs();
      }
      setJobs(res.data.data || []);
    } catch {
      setError('Failed to load applications.');
    } finally {
      setLoading(false);
    }
  }, [search, filter]);

  useEffect(() => {
    const timer = setTimeout(() => loadJobs(), 300);
    return () => clearTimeout(timer);
  }, [loadJobs]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    setDeleting(id);
    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((j) => j.id !== id));
    } catch {
      setError('Failed to delete application.');
    } finally {
      setDeleting(null);
    }
  };

  const formatCurrency = (val) =>
    val ? `₹${parseFloat(val).toLocaleString('en-IN')} LPA` : '—';

  return (
    <div className="page-container fade-in">
      {/* Header */}
      <div
        className="page-header"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div>
          <h1 className="page-title">My Applications</h1>
          <p className="page-subtitle">{jobs.length} application{jobs.length !== 1 ? 's' : ''} found</p>
        </div>
        <Link to="/jobs/add" className="btn-primary-custom">
          <i className="bi bi-plus-circle"></i> Add Application
        </Link>
      </div>

      {error && (
        <div className="alert-custom error">
          <i className="bi bi-exclamation-circle-fill"></i> {error}
        </div>
      )}

      {/* Table Card */}
      <div className="table-card">
        <div className="table-card-header">
          <span className="table-card-title">
            <i className="bi bi-briefcase me-2" style={{ color: 'var(--primary)' }}></i>
            All Applications
          </span>

          {/* Search + Filter */}
          <div className="search-filter-bar">
            <div className="search-input-wrap">
              <i className="bi bi-search"></i>
              <input
                id="search-company"
                type="text"
                className="search-input"
                placeholder="Search company..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setFilter('ALL'); }}
              />
            </div>
            <select
              id="filter-status"
              className="filter-select"
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setSearch(''); }}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="spinner-wrap"><div className="spinner"></div></div>
        ) : jobs.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-inbox"></i>
            <h5>No applications found</h5>
            <p>
              {search
                ? `No results for "${search}"`
                : filter !== 'ALL'
                ? `No ${STATUS_LABELS[filter]} applications`
                : 'Add your first job application to get started!'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Package</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <tr key={job.id}>
                    <td style={{ color: 'var(--gray-400)', fontWeight: 600 }}>{index + 1}</td>
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
                    <td style={{ fontWeight: 600, color: 'var(--primary)' }}>
                      {formatCurrency(job.packageAmount)}
                    </td>
                    <td>{job.applicationDate}</td>
                    <td><StatusBadge status={job.status} /></td>
                    <td>
                      <div className="action-btns">
                        <button
                          className="btn-icon edit"
                          title="Edit"
                          onClick={() => navigate(`/jobs/edit/${job.id}`)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn-icon delete"
                          title="Delete"
                          disabled={deleting === job.id}
                          onClick={() => handleDelete(job.id)}
                        >
                          {deleting === job.id
                            ? <span className="spinner-border spinner-border-sm" style={{ width: 12, height: 12 }}></span>
                            : <i className="bi bi-trash"></i>}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;

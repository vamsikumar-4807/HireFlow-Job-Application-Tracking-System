import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createJob } from '../services/api';

const STATUSES = [
  { value: 'APPLIED',              label: 'Applied' },
  { value: 'INTERVIEW_SCHEDULED',  label: 'Interview Scheduled' },
  { value: 'SELECTED',             label: 'Selected' },
  { value: 'REJECTED',             label: 'Rejected' },
];

const initialForm = {
  companyName:     '',
  jobRole:         '',
  location:        '',
  packageAmount:   '',
  applicationDate: new Date().toISOString().split('T')[0],
  status:          'APPLIED',
  notes:           '',
};

const AddJob = () => {
  const navigate = useNavigate();
  const [form, setForm]       = useState(initialForm);
  const [errors, setErrors]   = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.companyName.trim())   e.companyName   = 'Company name is required';
    if (!form.jobRole.trim())       e.jobRole       = 'Job role is required';
    if (!form.applicationDate)      e.applicationDate = 'Application date is required';
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        packageAmount: form.packageAmount ? parseFloat(form.packageAmount) : null,
      };
      await createJob(payload);
      navigate('/jobs');
    } catch (err) {
      setApiError(
        err.response?.data?.message || 'Failed to add application. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Add Application</h1>
        <p className="page-subtitle">Track a new job application</p>
      </div>

      <div className="form-card">
        {apiError && (
          <div className="alert-custom error">
            <i className="bi bi-exclamation-circle-fill"></i> {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Company Name */}
            <div className="form-group">
              <label className="form-label-custom">Company Name *</label>
              <input
                id="add-company"
                type="text"
                name="companyName"
                className={`form-control-custom ${errors.companyName ? 'error' : ''}`}
                placeholder="e.g. Google, Amazon"
                value={form.companyName}
                onChange={handleChange}
              />
              {errors.companyName && <span className="form-error">{errors.companyName}</span>}
            </div>

            {/* Job Role */}
            <div className="form-group">
              <label className="form-label-custom">Job Role *</label>
              <input
                id="add-role"
                type="text"
                name="jobRole"
                className={`form-control-custom ${errors.jobRole ? 'error' : ''}`}
                placeholder="e.g. Software Engineer"
                value={form.jobRole}
                onChange={handleChange}
              />
              {errors.jobRole && <span className="form-error">{errors.jobRole}</span>}
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label-custom">Location</label>
              <input
                id="add-location"
                type="text"
                name="location"
                className="form-control-custom"
                placeholder="e.g. Bangalore, Remote"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            {/* Package */}
            <div className="form-group">
              <label className="form-label-custom">Package (LPA)</label>
              <input
                id="add-package"
                type="number"
                name="packageAmount"
                className="form-control-custom"
                placeholder="e.g. 12.5"
                value={form.packageAmount}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>

            {/* Application Date */}
            <div className="form-group">
              <label className="form-label-custom">Application Date *</label>
              <input
                id="add-date"
                type="date"
                name="applicationDate"
                className={`form-control-custom ${errors.applicationDate ? 'error' : ''}`}
                value={form.applicationDate}
                onChange={handleChange}
              />
              {errors.applicationDate && <span className="form-error">{errors.applicationDate}</span>}
            </div>

            {/* Status */}
            <div className="form-group">
              <label className="form-label-custom">Status</label>
              <select
                id="add-status"
                name="status"
                className="form-control-custom"
                value={form.status}
                onChange={handleChange}
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Notes – full width */}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label-custom">Notes</label>
              <textarea
                id="add-notes"
                name="notes"
                className="form-control-custom"
                placeholder="Any additional notes, referral info, etc."
                value={form.notes}
                onChange={handleChange}
                rows={3}
                style={{ resize: 'vertical' }}
              />
            </div>
          </div>

          <div className="form-actions">
            <Link to="/jobs" className="btn-secondary-custom">
              <i className="bi bi-arrow-left"></i> Cancel
            </Link>
            <button
              id="add-submit"
              type="submit"
              className="btn-primary-custom"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="bi bi-plus-circle"></i> Add Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJob;

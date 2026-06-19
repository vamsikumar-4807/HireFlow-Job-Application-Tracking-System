import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getJobById, updateJob } from '../services/api';

const STATUSES = [
  { value: 'APPLIED',              label: 'Applied' },
  { value: 'INTERVIEW_SCHEDULED',  label: 'Interview Scheduled' },
  { value: 'SELECTED',             label: 'Selected' },
  { value: 'REJECTED',             label: 'Rejected' },
];

const EditJob = () => {
  const { id }    = useParams();
  const navigate  = useNavigate();

  const [form, setForm]         = useState(null);
  const [errors, setErrors]     = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);

  // Load existing data
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getJobById(id);
        const job = res.data.data;
        setForm({
          companyName:     job.companyName     || '',
          jobRole:         job.jobRole         || '',
          location:        job.location        || '',
          packageAmount:   job.packageAmount   || '',
          applicationDate: job.applicationDate || '',
          status:          job.status          || 'APPLIED',
          notes:           job.notes           || '',
          userId:          job.userId,
        });
      } catch {
        setApiError('Failed to load application data.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const validate = () => {
    const e = {};
    if (!form.companyName.trim())  e.companyName   = 'Company name is required';
    if (!form.jobRole.trim())      e.jobRole       = 'Job role is required';
    if (!form.applicationDate)     e.applicationDate = 'Application date is required';
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
    setSaving(true);
    try {
      const payload = {
        ...form,
        packageAmount: form.packageAmount ? parseFloat(form.packageAmount) : null,
      };
      await updateJob(id, payload);
      navigate('/jobs');
    } catch (err) {
      setApiError(
        err.response?.data?.message || 'Failed to update application. Please try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="spinner-wrap"><div className="spinner"></div></div>;
  }

  if (!form) {
    return (
      <div className="page-container">
        <div className="alert-custom error">
          <i className="bi bi-exclamation-circle-fill"></i> {apiError || 'Application not found.'}
        </div>
        <Link to="/jobs" className="btn-secondary-custom" style={{ marginTop: 12 }}>
          <i className="bi bi-arrow-left"></i> Back to List
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container fade-in">
      <div className="page-header">
        <h1 className="page-title">Edit Application</h1>
        <p className="page-subtitle">Update your application details</p>
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
                id="edit-company"
                type="text"
                name="companyName"
                className={`form-control-custom ${errors.companyName ? 'error' : ''}`}
                value={form.companyName}
                onChange={handleChange}
              />
              {errors.companyName && <span className="form-error">{errors.companyName}</span>}
            </div>

            {/* Job Role */}
            <div className="form-group">
              <label className="form-label-custom">Job Role *</label>
              <input
                id="edit-role"
                type="text"
                name="jobRole"
                className={`form-control-custom ${errors.jobRole ? 'error' : ''}`}
                value={form.jobRole}
                onChange={handleChange}
              />
              {errors.jobRole && <span className="form-error">{errors.jobRole}</span>}
            </div>

            {/* Location */}
            <div className="form-group">
              <label className="form-label-custom">Location</label>
              <input
                id="edit-location"
                type="text"
                name="location"
                className="form-control-custom"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            {/* Package */}
            <div className="form-group">
              <label className="form-label-custom">Package (LPA)</label>
              <input
                id="edit-package"
                type="number"
                name="packageAmount"
                className="form-control-custom"
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
                id="edit-date"
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
                id="edit-status"
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

            {/* Notes */}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label-custom">Notes</label>
              <textarea
                id="edit-notes"
                name="notes"
                className="form-control-custom"
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
              id="edit-submit"
              type="submit"
              className="btn-primary-custom"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  Updating...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle"></i> Update Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;

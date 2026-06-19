import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ── Helpers ────────────────────────────────────────────
const getUser = () => JSON.parse(localStorage.getItem('user'));

// ── User APIs ──────────────────────────────────────────
export const registerUser   = (data) => api.post('/users/register', data);
export const loginUser      = (data) => api.post('/users/login', data);

// ── Job Application APIs ───────────────────────────────
export const getAllJobs      = ()          => api.get(`/jobs?userId=${getUser().userId}`);
export const getJobById      = (id)        => api.get(`/jobs/${id}`);
export const createJob       = (data)      => api.post('/jobs', { ...data, userId: getUser().userId });
export const updateJob       = (id, data)  => api.put(`/jobs/${id}`, data);
export const deleteJob       = (id)        => api.delete(`/jobs/${id}`);
export const searchByCompany = (company)   => api.get(`/jobs/search?userId=${getUser().userId}&company=${company}`);
export const filterByStatus  = (status)    => api.get(`/jobs/status/${status}?userId=${getUser().userId}`);

// ── Dashboard API ──────────────────────────────────────
export const getDashboard    = ()          => api.get(`/dashboard?userId=${getUser().userId}`);

export default api;

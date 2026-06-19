import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JobList from './pages/JobList';
import AddJob from './pages/AddJob';
import EditJob from './pages/EditJob';
import Navbar from './components/Navbar';

// ── Auth Guard ─────────────────────────────────────────
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? (
    <>
      <Navbar />
      {children}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/jobs"      element={<PrivateRoute><JobList /></PrivateRoute>} />
        <Route path="/jobs/add"  element={<PrivateRoute><AddJob /></PrivateRoute>} />
        <Route path="/jobs/edit/:id" element={<PrivateRoute><EditJob /></PrivateRoute>} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

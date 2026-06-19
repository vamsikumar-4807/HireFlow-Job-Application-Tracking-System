import React from 'react';

const STATUS_CONFIG = {
  APPLIED: {
    label: 'Applied',
    icon: 'bi-send',
  },
  INTERVIEW_SCHEDULED: {
    label: 'Interview Scheduled',
    icon: 'bi-calendar-check',
  },
  SELECTED: {
    label: 'Selected',
    icon: 'bi-check-circle',
  },
  REJECTED: {
    label: 'Rejected',
    icon: 'bi-x-circle',
  },
};

const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || { label: status, icon: 'bi-circle' };
  return (
    <span className={`badge-status ${status}`}>
      <i className={`bi ${config.icon}`}></i>
      {config.label}
    </span>
  );
};

export default StatusBadge;

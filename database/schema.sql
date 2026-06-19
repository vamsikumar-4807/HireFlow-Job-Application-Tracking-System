-- ============================================================
--  Job Application Tracker — MySQL Schema
--  Run this in MySQL Workbench or any MySQL client
-- ============================================================

-- Create the database
CREATE DATABASE IF NOT EXISTS job_tracker_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE job_tracker_db;

-- ── Users table ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id       BIGINT AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(100)  NOT NULL,
  email    VARCHAR(150)  NOT NULL UNIQUE,
  password VARCHAR(255)  NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Job Applications table ────────────────────────────────
CREATE TABLE IF NOT EXISTS job_applications (
  id               BIGINT AUTO_INCREMENT PRIMARY KEY,
  company_name     VARCHAR(150)   NOT NULL,
  job_role         VARCHAR(150)   NOT NULL,
  location         VARCHAR(150),
  package          DECIMAL(10,2),
  application_date DATE           NOT NULL,
  status           ENUM(
                     'APPLIED',
                     'INTERVIEW_SCHEDULED',
                     'SELECTED',
                     'REJECTED'
                   ) NOT NULL DEFAULT 'APPLIED',
  notes            TEXT,
  user_id          BIGINT         NOT NULL,
  CONSTRAINT fk_job_user
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Sample Data (optional) ────────────────────────────────
-- Insert a test user (password: test123)
INSERT INTO users (name, email, password) VALUES
  ('Demo User', 'demo@example.com', 'test123');

-- Insert sample job applications for user id=1
INSERT INTO job_applications
  (company_name, job_role, location, package, application_date, status, notes, user_id)
VALUES
  ('Google',    'Software Engineer',        'Bangalore',  25.00, '2024-06-01', 'APPLIED',              'Applied via LinkedIn',         1),
  ('Amazon',    'Java Developer',           'Hyderabad',  20.00, '2024-06-05', 'INTERVIEW_SCHEDULED',  'HR call scheduled on June 15', 1),
  ('Microsoft', 'Full Stack Developer',     'Remote',     18.00, '2024-06-08', 'SELECTED',             'Offer received!',              1),
  ('Infosys',   'Associate Developer',      'Pune',        8.00, '2024-06-10', 'REJECTED',             'Better fit needed',            1),
  ('Flipkart',  'Backend Engineer',         'Bangalore',  15.00, '2024-06-12', 'APPLIED',              '',                             1);

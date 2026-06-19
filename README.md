# 📋 Job Application Tracker

A full-stack web application to track your job applications, built with:
- **Backend**: Java 17 + Spring Boot 3 + Spring Data JPA + MySQL
- **Frontend**: React.js 18 + Axios + Bootstrap Icons

---

## 📁 Project Structure

```
JOB APPLICATION TRACKER/
├── database/
│   └── schema.sql              ← MySQL schema + sample data
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/jobtracker/
│       ├── JobApplicationTrackerApplication.java
│       ├── entity/
│       │   ├── User.java
│       │   ├── JobApplication.java
│       │   └── ApplicationStatus.java
│       ├── repository/
│       │   ├── UserRepository.java
│       │   └── JobApplicationRepository.java
│       ├── service/
│       │   ├── UserService.java
│       │   ├── JobApplicationService.java
│       │   └── DashboardService.java
│       ├── controller/
│       │   ├── UserController.java
│       │   ├── JobApplicationController.java
│       │   └── DashboardController.java
│       ├── dto/
│       │   ├── RegisterRequest.java
│       │   ├── LoginRequest.java
│       │   ├── LoginResponse.java
│       │   ├── JobApplicationDTO.java
│       │   ├── DashboardDTO.java
│       │   └── ApiResponse.java
│       └── exception/
│           ├── ResourceNotFoundException.java
│           ├── BadRequestException.java
│           └── GlobalExceptionHandler.java
│   └── src/main/resources/
│       └── application.properties
└── frontend/
    ├── package.json
    ├── public/index.html
    └── src/
        ├── index.js
        ├── index.css
        ├── App.js
        ├── services/
        │   └── api.js
        ├── components/
        │   ├── Navbar.js
        │   └── StatusBadge.js
        └── pages/
            ├── Login.js
            ├── Register.js
            ├── Dashboard.js
            ├── JobList.js
            ├── AddJob.js
            └── EditJob.js
```

---

## ⚙️ Prerequisites

| Tool        | Version      |
|-------------|--------------|
| Java        | 17+          |
| Maven       | 3.8+         |
| MySQL       | 8.0+         |
| Node.js     | 18+          |
| npm         | 9+           |

---

## 🗄️ Step 1: Database Setup

1. Open MySQL Workbench or any MySQL client
2. Run the schema file:
   ```sql
   source path/to/database/schema.sql
   ```
   Or copy-paste the contents of `database/schema.sql`

3. Verify tables created:
   ```sql
   USE job_tracker_db;
   SHOW TABLES;
   ```

---

## 🚀 Step 2: Backend Setup

### Configure Database Credentials

Open `backend/src/main/resources/application.properties` and update:
```properties
spring.datasource.username=root        # your MySQL username
spring.datasource.password=root        # your MySQL password
```

### Run the Backend

```bash
cd backend
mvn spring-boot:run
```

The backend starts at: **http://localhost:8080**

You should see:
```
Started JobApplicationTrackerApplication in X.XXX seconds
```

---

## 💻 Step 3: Frontend Setup

```bash
cd frontend
npm install
npm start
```

The React app opens at: **http://localhost:3000**

---

## 📡 REST API Endpoints

### User APIs
| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| POST   | /api/users/register   | Register new user  |
| POST   | /api/users/login      | Login user         |

### Job Application APIs
| Method | Endpoint                       | Description              |
|--------|--------------------------------|--------------------------|
| GET    | /api/jobs?userId={id}          | Get all applications     |
| GET    | /api/jobs/{id}                 | Get one application      |
| POST   | /api/jobs                      | Create application       |
| PUT    | /api/jobs/{id}                 | Update application       |
| DELETE | /api/jobs/{id}                 | Delete application       |
| GET    | /api/jobs/search?userId=&company= | Search by company    |
| GET    | /api/jobs/status/{status}?userId= | Filter by status     |

### Dashboard API
| Method | Endpoint                      | Description         |
|--------|-------------------------------|---------------------|
| GET    | /api/dashboard?userId={id}    | Get stats counts    |

---

## 🧪 Testing the Application

### 1. Register a User
- Go to http://localhost:3000/register
- Fill in Name, Email, Password (min 6 chars)
- Click "Create Account"

### 2. Login
- Go to http://localhost:3000/login
- Use the email/password you registered with
- Or use the demo user: `demo@example.com` / `test123`

### 3. Dashboard
- View your total, applied, interview, selected, rejected counts
- See the 5 most recent applications

### 4. Add Application
- Click "Add New" in the navbar
- Fill in company name, job role, date, status, etc.

### 5. Edit / Delete
- Go to "Applications" page
- Use the pencil (✏️) button to edit
- Use the trash (🗑️) button to delete

### 6. Search & Filter
- Type a company name in the search box
- Use the status dropdown to filter

---

## 🔧 Sample API Test (curl)

```bash
# Register
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"secret123"}'

# Login
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"secret123"}'

# Add a job application (replace userId with actual id)
curl -X POST http://localhost:8080/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"companyName":"Google","jobRole":"SWE","applicationDate":"2024-06-15","status":"APPLIED","userId":1}'

# Get all jobs for user 1
curl http://localhost:8080/api/jobs?userId=1

# Search by company
curl "http://localhost:8080/api/jobs/search?userId=1&company=Google"

# Get dashboard stats
curl http://localhost:8080/api/dashboard?userId=1
```

---

## 🎨 Features

- ✅ User Registration & Login
- ✅ Add / Edit / Delete Job Applications
- ✅ Search by Company Name (live)
- ✅ Filter by Status
- ✅ Dashboard with Statistics Cards
- ✅ Responsive Design (mobile-friendly)
- ✅ Color-coded Status Badges
- ✅ Global Exception Handling
- ✅ Input Validation (frontend + backend)
- ✅ Protected Routes (auth guard)

---

## 📝 Resume Highlights

This project demonstrates:
- **REST API design** with Spring Boot
- **JPA & Hibernate** for ORM
- **React Router v6** for SPA navigation
- **Axios** for HTTP client
- **Component-based architecture**
- **Exception handling** and **validation**
- **DTO pattern** for clean API contracts
- **Responsive UI** with modern CSS

---

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| `Access denied for user 'root'` | Update credentials in `application.properties` |
| `Table doesn't exist` | Run `schema.sql` first |
| CORS error | Ensure backend is running on port 8080 |
| React app blank | Check browser console; ensure `npm install` ran |
| Port 8080 in use | Change `server.port` in `application.properties` |

# 🧠 NeuroHR – AI-Powered HR Management Platform

NeuroHR is a modern AI-driven recruitment platform that streamlines the hiring process for HR teams and job seekers alike. With a powerful .NET backend, a responsive Angular frontend, and integrated AI microservices, it automates resume screening, matches candidates to job posts, and allows for seamless job applications and user management.

---

## 🚀 Features

### 👤 User Management

* Register and authenticate via JWT.
* Role-based access (Admin, HR, User).
* View, update, and delete users.
* Email notifications (e.g., application updates).

### 🧳 Job Postings

* HR users can post, update, and manage job offers.
* Filter/search jobs.
* View job details and associated candidates.

### 📄 Job Applications

* Users can apply to jobs and view their application history.
* HR can view all applications, filter by job, and manage application statuses.

### 🧠 AI Integration (Python Microservice)

* **Resume Analyzer**: Score resumes based on job requirements.
* **Profile Extractor**: Auto-generate candidate profiles from resumes.

### 🎯 Smart Onboarding

* New users can build a profile manually or by uploading their resume for AI extraction.

---

## ⚙️ Technologies Used

| Layer       | Tech Stack                              |
| ----------- | --------------------------------------- |
| Backend API | .NET 8 (C#), Entity Framework, JWT Auth |
| Frontend    | Angular 17, Tailwind CSS                |
| AI Services | Python (Flask), NLP & ML Models         |
| Database    | SQL Server                              |
| Dev Tools   | Postman, Swagger, Docker (optional)     |

---

## 📁 Folder Structure

### Backend (.NET)

```
/NeuroHRBack
├── Controllers
├── Models
├── DTOs
├── Services
├── Data
└── Program.cs
```

### AI Microservice (Python Flask)

```
/ats
├── app.py
├── .env
├──requirements.txt
└── models/
```

### Frontend (Angular)

```
/NEUROHR
├── src/app
│   ├── job
│   ├── candidate
│   ├── user
│   ├── auth
│   ├── chatbot
│   ├── onboarding
│   ├── profile
│   └── pipes
```

---

## 🌐 API Documentation

### 🔐 Auth

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | `/api/Auth/register` | Register a new user         |
| POST   | `/api/Auth/login`    | Authenticate and return JWT |

### 👤 User

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| GET    | `/api/User`            | Get all users             |
| GET    | `/api/User/{id}`       | Get user by ID            |
| POST   | `/api/User`            | Add user                  |
| PUT    | `/api/User/{id}`       | Update user               |
| DELETE | `/api/User/{id}`       | Delete user               |
| POST   | `/api/User/send-email` | Send email (notification) |

### 💼 JobPosting

| Method | Endpoint               | Description                      |
| ------ | ---------------------- | -------------------------------- |
| GET    | `/api/JobPosting`      | List all jobs (filter supported) |
| GET    | `/api/JobPosting/{id}` | Get job by ID                    |
| POST   | `/api/JobPosting`      | Add job (HR only)                |
| PUT    | `/api/JobPosting/{id}` | Update job (HR only)             |
| DELETE | `/api/JobPosting/{id}` | Delete job (HR only)             |

### 📄 JobApplication

| Method | Endpoint                                     | Description                  |
| ------ | -------------------------------------------- | ---------------------------- |
| GET    | `/api/JobApplication`                        | Get all job applications     |
| GET    | `/api/JobApplication/{id}`                   | Get job application by ID    |
| POST   | `/api/JobApplication`                        | Submit job application       |
| PUT    | `/api/JobApplication/{id}`                   | Update application           |
| DELETE | `/api/JobApplication/{id}`                   | Delete application           |
| GET    | `/api/JobApplication/user`                   | Applications by current user |
| GET    | `/api/JobApplication/user/applied-jobs`      | Jobs applied by user         |
| GET    | `/api/JobApplication/job/{jobId}/candidates` | Candidates for a job         |
| PATCH  | `/api/JobApplication/{applicationId}/status` | Update application status    |

### 🤖 AI Microservice (Python Flask)

| Method | Endpoint           | Description                 |
| ------ | ------------------ | --------------------------- |
| POST   | `/evaluate`        | Match resume to job         |
| POST   | `/extract_profile` | Extract profile from resume |
| GET    | `/models`          | List available AI models    |

---

## 🧭 Angular App Routing Overview

### Top-Level Routes

| Path                     | Description                        |
| ------------------------ | ---------------------------------- |
| `/`                      | Redirect to dashboard              |
| `/login`, `/register`    | Auth pages                         |
| `/onboarding`            | Profile onboarding (resume/manual) |
| `/firstLogin`            | Post-registration setup            |
| `/user-job-applications` | View user's job applications       |
| `/404`, `/500`           | Error pages                        |

### Lazy-Loaded Modules (via `DefaultLayoutComponent`)

| Path                                                                  | Feature                            |
| --------------------------------------------------------------------- | ---------------------------------- |            
| `/users`                                                              | User management                    |
| `/job`                                                                | Job management                     |
| `/candidate`                                                          | Candidate management               |
| `/chatbot`                                                            | AI chatbot                         |
| `/forms`, `/icons`, `/notifications`, `/widgets`, `/charts`, `/pages` | UI/UX modules                      |
| `/profile`                                                            | User profile view/edit (protected) |

---

## ✅ Setup Instructions

 **Clone the repository**

   ```bash
   git clone https://github.com/your-org/neurohr.git](https://github.com/Nour0206/NeuroHr.git
   cd NeuroHr
   ```

---

## 📦 Installation & Run

### 🖥️ Backend (.NET)

```bash
 cd NeuroBack
 dotnet restore
 dotnet run
```

### 🧪 AI Microservice (Python Flask)

```bash
cd ats
pip install -r requirements.txt
python app.py
```

### 🌐 Frontend (Angular)

```bash
cd NEUROHR
npm install
ng serve
```

---

## 🤝 Contributing

We welcome community involvement! To contribute:

1. Fork this repo.
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -am "Add feature"`
4. Push: `git push origin feature/my-feature`
5. Submit a pull request 🚀

Make sure to follow the code style and test your changes before PR submission.

---

## 📬 Contact

For support or collaboration opportunities:

* **Ahlem Ben Mohamed**
  📧 [benmohamedahlemm@gmail.com](mailto:benmohamedahlemm@gmail.com)

* **Nour Elhouda El Khedhri**
  📧 [nourkhedri0206@gmail.com](mailto:nourkhedri0206@gmail.com)

---

> Built with ❤️ to empower smarter hiring through AI.
> **NeuroHr** – Your next-gen talent acquisition partner.

---

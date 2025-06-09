# 🤖 NeuroHR - AI-Powered HR Management Platform

NeuroHR is a smart HR management system designed to streamline recruitment, resume evaluation, and job matching using Artificial Intelligence.

## 🌐 Tech Stack

* **Frontend**: Angular
* **Backend**: .NET Web API
* **AI Microservice**: Python (Flask)
* **Database**: MongoDB / SQL Server

---

## 🚀 Key Features

### ✅ AI Resume Matching

* Analyze resume vs. job description
* Return:

  * Relevancy Score
  * Missing Keywords
  * AI-Generated Profile Summary
* **\[NEW]** Automatically extract full candidate profiles from uploaded resumes using AI

### 🧠 AI Profile Auto-Generation

* Upload a resume and let AI auto-fill the user profile
* Extracted fields include:

  * Name, Email, Phone
  * Experience (roles, companies, durations)
  * Education (degrees, institutions)
  * Skills (technical and soft)
  * Summary
* Optional manual editing supported

### 👤 Role-Based Access

* **Admin**: Full access to all features
* **HR Manager**: Manage job postings, view applications
* **Candidate**: Apply to jobs, edit profile

### 📬 Notifications

* Email alerts for:

  * Application status
  * Interview invitations

### 📊 Audit Logs

* Admins can view logs of critical system activities

### 📂 Admin Panel (Optional)

* Built with **React** or **AdminJS**
* Dashboard for monitoring users, job posts, AI usage

---

## 📚 Usage

1. **Register/Login** (with role selection: Admin, HR, Candidate)
2. **Candidate**:

   * Upload resume OR manually fill profile
   * AI extracts profile fields automatically
   * Browse jobs and apply
3. **HR**:

   * Create/edit job postings
   * View ranked applications using AI scores
4. **Admin**:

   * Monitor users and logs
   * Configure AI features

---

## 📡 API Endpoints

### .NET Backend API — `http://localhost:5183/api/...`

#### 🔐 Auth

* `POST /api/Auth/register` — Register new user
* `POST /api/Auth/login` — Authenticate user (returns JWT)

#### 👥 User

* `GET /api/User` — Get all users
* `GET /api/User/{id}` — Get user by ID
* `POST /api/User` — Add user
* `PUT /api/User/{id}` — Update user
* `DELETE /api/User/{id}` — Delete user
* `POST /api/User/send-email` — Send email notification

#### 📄 JobPosting

* `GET /api/JobPosting` — Get all jobs (with filters)
* `GET /api/JobPosting/{id}` — Get job by ID
* `POST /api/JobPosting` — Create job (HR only)
* `PUT /api/JobPosting/{id}` — Update job (HR only)
* `DELETE /api/JobPosting/{id}` — Delete job (HR only)

#### 📬 JobApplication

* `GET /api/JobApplication` — Get all applications
* `GET /api/JobApplication/{id}` — Get application by ID
* `POST /api/JobApplication` — Submit application
* `PUT /api/JobApplication/{id}` — Update application
* `DELETE /api/JobApplication/{id}` — Delete application
* `GET /api/JobApplication/user` — Get current user’s applications
* `GET /api/JobApplication/user/applied-jobs` — Jobs user applied to
* `GET /api/JobApplication/job/{jobId}/candidates` — Candidates for a job
* `PATCH /api/JobApplication/{applicationId}/status` — Change status

### 🧠 Python Flask AI Microservice — `http://localhost:5000/...`

* `POST /evaluate` — Evaluate resume vs. job description
* `POST /extract_profile` — Extract structured profile from resume
* `GET /models` — View available AI models

---

## 🛠️ Config

```json
"AISettings": {
  "EnableProfileAutoFill": true
}
```

---

## 📦 Installation & Run

### 🖥️ Backend (.NET)

```bash
cd Backend
 dotnet restore
 dotnet run
```

### 🧪 AI Microservice (Python Flask)

```bash
cd ai-service
pip install -r requirements.txt
python app.py
```

### 🌐 Frontend (Angular)

```bash
cd frontend
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

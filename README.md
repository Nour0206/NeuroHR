
# NeuroHr

NeuroHr is a comprehensive Human Resources management platform designed to modernize recruitment processes by leveraging AI-driven resume evaluation and job matching. This full-stack application combines a modern Angular frontend, a robust .NET backend API, and a Python microservice for advanced resume analysis.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Architecture](#architecture)  
- [Installation](#installation)  
  - [Prerequisites](#prerequisites)  
  - [Frontend Setup](#frontend-setup)  
  - [Backend Setup](#backend-setup)  
  - [AI Microservice Setup](#ai-microservice-setup)  
- [Configuration](#configuration)  
- [Usage](#usage)  
- [API Endpoints](#api-endpoints)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- **Job Management:** Create, update, delete, and list job postings with filtering by domain and contract type.
- **User Roles:** Role-based access for candidates and HR personnel.
- **Job Application:** Candidates can upload resumes and apply for jobs.
- **AI-Powered Resume Evaluation:** Integration with a Python Flask microservice that analyzes resumes and returns matching scores, missing keywords, and profile summaries.
- **Notifications:** User-friendly alerts and confirmations via SweetAlert2.
- **Real-time UI Updates:** Reflect job application status dynamically.
- **Secure Authentication:** JWT-based authentication and authorization.
- **Responsive UI:** Modern Angular components with CoreUI integration.

---

## Tech Stack

| Layer             | Technology                |
|-------------------|---------------------------|
| Frontend          | Angular 19, TypeScript, RxJS, SweetAlert2, CoreUI Angular |
| Backend API       | .NET 9 Web API, C#        |
| AI Microservice   | Python 3, Flask, Groq API |
| Database          | SQL Server (or any RDBMS) |
| Authentication    | JWT, ASP.NET Identity     |

---

## Architecture Overview

Angular Frontend
      ↓
ASP.NET Backend API
      ↓
SQL Server Database
      ↓
Python Flask AI Microservice


* Frontend interacts with backend API for all CRUD operations.
* Backend calls AI microservice to analyze uploaded resumes.
* AI microservice returns structured evaluation data that backend stores and returns to frontend.

---

## Installation

### Prerequisites

* **Node.js** (v18 or higher)
* **.NET SDK 9**
* **Python 3.9+**
* **SQL Server** or compatible database
* **Git** (optional, for cloning repo)

---

### Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd NeuroHr-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Angular development server:

   ```bash
   npm run start
   ```

4. Open your browser at [http://localhost:4200](http://localhost:4200)

---

### Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd NeuroHr-backend
   ```

2. Restore .NET dependencies:

   ```bash
   dotnet restore
   ```

3. Configure your database connection in `appsettings.json`:

   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=YOUR_SERVER;Database=NeuroHrDb;Trusted_Connection=True;MultipleActiveResultSets=true"
   }
   ```

4. Run database migrations if applicable (e.g., EF Core migrations).

5. Start the backend API server:

   ```bash
   dotnet run
   ```

---

### AI Microservice Setup

1. Navigate to the AI microservice folder:

   ```bash
   cd NeuroHr-ai-service
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate   # Linux/macOS
   venv\Scripts\activate      # Windows
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask app:

   ```bash
   python app.py
   ```

5. The AI service will be accessible at `http://localhost:5000`

---

## Configuration

* **API URLs:** Ensure Angular services point to your backend URLs (`http://localhost:5183/api/...`) and AI microservice URL (`http://localhost:5000/evaluate`)
* **CORS:** Configure CORS policies in backend and AI service to allow frontend requests.
* **Authentication:** Update JWT secret keys and token expiration settings in backend `appsettings.json`.
* **Database:** Adjust connection strings and run EF migrations or SQL scripts.

---

## Usage

* Register or log in as a Candidate or HR.
* Browse jobs filtered by domain or contract type.
* Candidates upload resumes to apply for jobs.
* Applications are analyzed by AI microservice and results stored.
* HR users manage job postings and view candidate applications with AI insights.
* Notifications and confirmation dialogs improve user experience.

---

## API Endpoints (Sample)

| Endpoint                                | Method | Description                        |
| --------------------------------------- | ------ | ---------------------------------- |
| `/api/Auth/register`                    | POST   | Register new user                  |
| `/api/Auth/login`                       | POST   | Authenticate user and return JWT   |
| `/api/Job`                              | GET    | Get list of jobs                   |
| `/api/Job`                              | POST   | Create a new job (HR only)         |
| `/api/Job/{id}`                         | PUT    | Update job by id (HR only)         |
| `/api/Job/{id}`                         | DELETE | Delete job by id (HR only)         |
| `/api/JobApplication`                   | POST   | Submit a job application           |
| `/api/JobApplication/user/applied-jobs` | GET    | Get jobs applied by the user       |
| `/evaluate` (Python service)            | POST   | Analyze resume against job details |

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a pull request.

Please make sure to follow existing code style and add tests where appropriate.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

If you have any questions or suggestions, feel free to reach out:

* **Author:** \[Ahlem Ben Mohamed - Nour Elhouda el khedhri]
* **Email:** [benmohamedahlemm@gmail.com](mailto:benmohamedahlemm@gmail.com)
* **Email:** [nourkhedri0206@gmail.com](mailto:nourkhedri0206@gmail.com)


---

Thank you for using **NeuroHr** — empowering smarter hiring with AI!


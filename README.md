# Chotadhobi - Smart Laundry Management System

Chotadhobi is a comprehensive web-based solution designed to automate, manage, and streamline laundry services within student accommodations or hostels. The platform ensures transparent, accessible, and efficient operations for both students and administrators.

---

## 🧺 Core Functionality

- **Laundry Automation:**  
  Automates and manages the entire laundry workflow, reducing manual interventions.

- **Web-Based Platform:**  
  Accessible from any modern browser for students and administrators.

- **Transparency & Accessibility:**  
  Enhances accuracy in request tracking and fosters trust through clear visibility of operations.

- **Real-Time Updates:**  
  Notifies users instantly about the status and progress of their laundry tasks.

---

## 🧑‍🎓 Student Features

- **Secure Registration & Login:**  
  Multi-user authentication ensures a secure environment for student access.

- **Place Wash Requests:**  
  Simple interface for students to submit new laundry requests.

- **Track Progress:**  
  Live updates display the current status of each wash order.

- **View Order History:**  
  Students can review their entire laundry request history within their profile.

---

## 👨‍💼 Administrator Features

- **Request Management:**  
  Admins can approve, reject, or update laundry requests as they are received.

- **Pending Requests Dashboard:**  
  Dedicated view to efficiently manage requests waiting for administrative action.

- **History View:**  
  Complete record of processed (approved/rejected/completed) requests.

---

## ⚙️ Technical Highlights

- **Full-Stack Web Application:**  
  - **Backend:** Spring Boot  
  - **Data Persistence:** JPA (& Hibernate)  
  - **Database:** MySQL  
  - **Frontend:** HTML, TailwindCSS, and JavaScript

- **RESTful API Communication:**  
  Client and server interact via well-defined REST endpoints.

- **Database Schema:**  
  - `users`: Stores student and admin accounts.
  - `wash_requests`: Stores laundry requests, linked to users (primary key–foreign key relationship).

---

## 🚀 Getting Started

### Prerequisites

- Java (17+ recommended)
- Maven (for building the backend)
- MySQL Database (running instance)
- Node.js (optional, for advanced frontend tooling)

### Setup Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/<your-username>/chotadhobi.git
   cd chotadhobi
   ```

2. **Configure Database**
   - Create a new MySQL database (e.g., `chotadhobi_db`).
   - Update `application.properties` (backend) with your database credentials.

3. **Build and Run Backend**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

4. **Start Frontend**
   - Serve HTML/CSS/JS with a static server or configure as per your deployment preference.

---

## 📋 Usage

- **Students:**  
  Register, log in, submit new wash requests, and track/order history via the web UI.

- **Administrators:**  
  Manage incoming laundry requests, update statuses, and monitor operational history from the admin dashboard.

---

## 🗄️ Database Schema Diagram (Simplified)

```
users
-----
id (PK)
username
password
role (STUDENT/ADMIN)
...

wash_requests
-------------
id (PK)
user_id (FK → users.id)
status (PENDING/APPROVED/REJECTED/COMPLETED)
request_date

# 🏨 Hotel Booking Platform

A full-stack hotel booking platform where users can browse hotels, make bookings, and receive personalized recommendations based on their activity (visits, draft bookings, completed bookings). Admins can view analytics and manage data.

---

## 🚀 Features

- 🔐 **Authentication** – Sign up / Login with protected routes.
- 🏨 **Hotel Listings** – Browse hotels with ratings, categories, and amenities.
- 📊 **Activity Tracking** – Track visits, draft, and completed bookings.
- 🧠 **Recommendation Engine** – Suggest hotels based on past user behavior.
- 📈 **Admin Analytics** – View hotel activity stats (visits, bookings).
- 💅 **Polished UI** – Responsive layout, form validation, and loading states.

---

## 📁 Folder Structure

hotel-platform/
├── backend/ # Express + MongoDB API
├── frontend/ # React client
├── seed/ # Seed scripts for test data
└── README.md # This file

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/hotel-platform.git
cd hotel-platform
```

### 2. Setup Environment Variables

Create a .env file in the backend/ folder:

MONGO_URI=mongodb+srv://Vishwas1415:Vishwas1415@cluster0.uwen03l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your_jwt_secret_key
PORT=5000

### 3. Install Dependancies

# Backend

cd backend
npm install

# Frontend

cd ../frontend
npm install

### 4. Seed the Database

cd ../
node seed/userSeed.js
node seed/hotelSeed.js

### Run the App

cd backend
npm run dev

cd frontend
npm start

App runs on:

Frontend: http://localhost:3000

Backend: http://localhost:5000

Sample Users:

Role Email Password
Admin vishwas@example.com password123
User jane@example.com password123
User john@example.com password123

📡 API Endpoints
Auth
POST /api/auth/signup

POST /api/auth/login

Hotels
GET /api/hotels

GET /api/hotels/:id

Bookings
POST /api/bookings/draft

POST /api/bookings/complete

GET /api/bookings/me

Activity
POST /api/activity/visit

GET /api/activity/stats/:hotelId

Recommendations
GET /api/recommendations (auth required)

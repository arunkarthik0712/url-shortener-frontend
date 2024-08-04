# URL Shortener Application

This project is a URL shortener application built using the MERN stack (MongoDB, Express, React, Node.js) with additional features including user authentication and URL analytics. It allows users to create shortened URLs and view statistics.

## Features

- **Shorten URLs:** Convert long URLs into short URLs.
- **User Authentication:** Secure login and registration.
- **Dashboard:** Visualize URL creation and analytics.

## Technologies Used

- **Frontend:** React, Bootstrap (via CDN), React Toastify
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Charting:** Chart.js
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: Nodemailer

---

## Deployed URL:

- **Frontend**: [https://arunkarthik0710-url-shortener.netlify.app/](https://arunkarthik0710-url-shortener.netlify.app/)
- **Backend**: `https://url-shortener-i6s8.onrender.com`

---

## Usage

1. **Register:** Create a new account or log in with an existing account.
2. **Shorten URLs:** Use the form to shorten a long URL.
3. **View URLs:** Access the dashboard to see your shortened URLs and their analytics.

---

## Routes

- **POST /api/urls/shorten** - Shorten a URL
- **GET /api/urls/** - Get a list of URLs
- **GET /api/urls/:id** - Get details of a specific URL
- **GET /api/urls/dash/count** - Get dashboard data
- **POST /api/auth/register** - Register a new user
- **POST /api/auth/login** - Log in an existing user

---

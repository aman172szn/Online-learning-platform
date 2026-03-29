# Axium AI - Online Learning Platform

**Axium AI** is a full-stack e-learning solution built on the **MERN** stack. It empowers educators to manage and deliver video-based courses while providing students with a seamless learning experience through a dynamic and secure interface.

## Tech Stack

- **Frontend:** React.js, Redux Toolkit (State Management), RTK Query (Data Fetching), Sass (Styling)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Media Storage:** Cloudinary API (Video & Image Management)
- **Security:** JWT (JSON Web Tokens) with HTTP-Only Cookies, Bcryptjs password hashing

---

## Key Features

- **Role-Based Access Control (RBAC):** Distinct dashboards and permissions for Students, Teachers, and Admins.
- **Course Management:** Teachers can perform full CRUD operations (Create, Read, Update, Delete) on their courses.
- **Secure Video Uploads:** Integrated Cloudinary SDK for efficient media handling and global delivery.
- **Real-time Validation:** Custom frontend form validation with instant error feedback.
- **Persistent Auth:** Secure login sessions using encrypted browser cookies.

---

## Trial Credentials

For testing purposes, you can log in using the following accounts:

| Role        | Email Address        | Password   |
| :---------- | :------------------- | :--------- |
| **Admin**   | `goku@gmail.com`     | `asdasd@1` |
| **Teacher** | `teacher1@gmail.com` | `asdasd@1` |
| **Student** | `cr7@gmail.com`      | `asdasd@1` |

## Installation & Setup

Follow these steps to get a local copy of Axium AI up and running.

## Installation & Setup

Follow these steps to get a local copy of Axium AI up and running.

### 1. Clone the repository

```bash
git clone https://github.com/YeduKrishnan-A/Online-learning-platform.git
cd Online-learning-platform
```

### 2. Backend Setup

Navigate to the backend directory and create a `.env` file:

```bash
cd backend
```

Create a `.env` file and add:

| Variable              | Description                       |
| --------------------- | --------------------------------- |
| MONGO_URI             | Your MongoDB connection string    |
| JWT_SECRET            | Secret key for JWT authentication |
| CLOUDINARY_CLOUD_NAME | Your Cloudinary cloud name        |
| CLOUDINARY_API_KEY    | Your Cloudinary API key           |
| CLOUDINARY_API_SECRET | Your Cloudinary API secret        |

Then install dependencies:

```bash
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Run the Application

```bash
npm run dev
```

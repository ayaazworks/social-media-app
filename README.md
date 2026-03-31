# 📸 Instagram Clone (Full-Stack)

A feature-rich social media platform built with the **MERN stack** and **Socket.io**, featuring real-time interactions, media uploads, and a responsive UI.

---

## 🔗 Live Demo

**Experience the app live here:** [https://friendly-grace-production-6569.up.railway.app](https://friendly-grace-production-6569.up.railway.app)

-----

## 🚀 Features

### 🎬 Content & Entertainment
* **Posts & Loops (Reels):** Upload, like, and save images or short-form videos.
* **Stories:** 24-hour temporary updates with a "Seen by" viewer list.
* **Comments:** Interactive comment sections on both posts and loops.

### 👥 Social Connectivity
* **Real-time Messaging:** Instant 1-on-1 chatting powered by Socket.io.
* **Follow System:** Follow/Unfollow users to curate your feed.
* **Live Notifications:** Real-time alerts for likes, follows, and messages.
* **User Search:** Fast, case-insensitive search for people by name or username.

### 🛠 User Management
* **Authentication:** Secure Sign-up, Sign-in, and Forgot Password (via Nodemailer).
* **Profile Customization:** Edit bio, profession, gender, and profile picture (via Cloudinary).
* **Protected Routes:** React Router guards to ensure data privacy.

---

## 💻 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Redux Toolkit, Tailwind CSS 4, Vite |
| **Backend** | Node.js, Express 5, MongoDB, Mongoose |
| **Real-time** | Socket.io (Client & Server) |
| **Cloud** | Cloudinary (Media Storage), Railway (Deployment) |
| **Auth** | JSON Web Tokens (JWT), BcryptJS, Cookie-parser |

---

## 🛠 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/instagram-clone.git
   ```

2. **Backend Setup**
   * Navigate to `/backend`
   * Create a `.env` file with: `PORT`, `MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_URL`.
   * Run `npm install` then `npm run dev`.

3. **Frontend Setup**
   * Navigate to `/frontend`
   * Run `npm install` then `npm run dev`.

---

## 📁 Project Structure

```text
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI (FollowButton, Post, Nav)
│   │   ├── hooks/        # Custom Data Fetching Hooks
│   │   ├── pages/        # Main Views (Home, Profile, MessagesArea)
│   │   └── redux/        # Redux Toolkit Slices (userSlice, socketSlice)
└── backend/
    ├── controllers/      # Logic for users, posts, and notifications
    ├── models/           # Mongoose Schemas (User, Post, Notification)
    ├── routes/           # Express Route Definitions
    └── index.js          # Entry point & Socket.io setup
```

---

## 📝 Key Learning Outcomes
* Managing complex global state with **Redux Toolkit**.
* Optimizing database queries with **Mongoose Populates** and **Lean** queries.
* Handling real-time bidirectional communication with **WebSockets**.
* Implementing **Multer + Cloudinary** for seamless media processing.
* 

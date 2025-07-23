# 💬 Real-Time Chat App (MERN + Socket.io)

This is a real-time chat application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and **Socket.io** for WebSocket-based communication.

Users can send public messages, private messages, and see typing indicators. 
All chat data is stored in MongoDB.

---

## 🚀 Features

- ✅ Real-time messaging with Socket.io
- 👤 User join/leave tracking
- ✉️ Public and private messaging
- 💬 Typing indicators
- 🧠 Backend user/session handling
- 📦 Messages stored in MongoDB
- 🛡️ CORS and environment-based configuration
- 🖥️ Frontend and backend connected via environment variables

---

## 📁 Project Structure

chat-app/
├── client/ # React frontend
│ └── socket.js # Handles socket.io client logic
├── server/ # Express backend
│ ├── controllers/ # Business logic for users & messages
│ ├── models/ # Mongoose models (User, Message)
│ ├── config/ # MongoDB connection logic
│ ├── public/ # Static files (if needed)
│ └── server.js # Main server entry
├── .env # Environment config (PORT, DB_URI, etc)
└── README.md



---

## ⚙️ Technologies Used

| Frontend       | Backend             | Others           |
|----------------|---------------------|------------------|
| React          | Express.js          | MongoDB          |
| Socket.io      | Node.js             | Mongoose         |
| Tailwind (opt) | CORS, dotenv        | Vite (optional)  |

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/DonaldDan/chatApp.git
cd chat-app

2. Setup Environment Variables
Create a .env file in the server/ directory:

        PORT=5000
        MONGO_URI=mongodb://localhost:27017/chatApp
        VITE_CLIENT_URL=http://localhost:5173
client/, setup Vite env:
        VITE_SOCKET_URL=http://localhost:5000
🛠️ Getting Started
Start Backend
        cd server
        pnpm install
        pnpm run dev    # or: node server.js
Start Frontend
        cd client
        npm install
        npm run dev    # Runs Vite dev server

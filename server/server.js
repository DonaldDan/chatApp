// server.js - Main server file for Socket.io chat application

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config();

// MongoDB connection
const connectDB = require('./config/db');
connectDB();

// Allowed CORS origins
const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://chat-app-beta-drab.vercel.app', // deployed frontend on Vercel
];

// Express app setup
const app = express();

// CORS middleware for Express
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Other middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Create HTTP server and Socket.IO instance
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Controllers
const { handleUserJoin, handleDisconnect } = require('./controllers/userController');
const { handleMessage, getRecentMessages } = require('./controllers/messageController');

// Socket.IO logic
io.on('connection', (socket) => {
  console.log(`✅ Socket connected: ${socket.id}`);

  socket.on('user_join', (username) => {
    handleUserJoin(io, socket, username);
  });

  socket.on('send_message', (messageData) => {
    handleMessage(io, socket, messageData);
  });

  socket.on('typing', (isTyping) => {
    socket.broadcast.emit('typing_users', { id: socket.id, isTyping });
  });

  socket.on('private_message', ({ to, message }) => {
    const messageData = {
      sender: socket.id,
      message,
      to,
      isPrivate: true,
    };
    io.to(to).emit('private_message', messageData);
    socket.emit('private_message', messageData);
  });

  socket.on('disconnect', () => {
    handleDisconnect(io, socket);
  });
});

// API routes
app.get('/api/messages', getRecentMessages);

// Health check
app.get('/', (req, res) => {
  res.send('✅ Chat Server is running with MongoDB');
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

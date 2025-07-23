// server.js - Main server file for Socket.io chat application

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// MongoDB connection
const connectDB = require('./config/db');
connectDB();

// Controllers
const { handleUserJoin, handleDisconnect } = require('./controllers/userController');
const { handleMessage } = require('./controllers/messageController');

// Express setup
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.VITE_CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Socket.io events
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

// Routes
const { getRecentMessages } = require('./controllers/messageController');
app.get('/api/messages', getRecentMessages);

// Health check route
app.get('/', (req, res) => {
  res.send('✅ Chat Server is running with MongoDB');
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

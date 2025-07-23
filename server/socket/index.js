// server/socket/index.js

const {
  handleSendMessage,
  handleTyping,
  handlePrivateMessage,
} = require('../controllers/chatController');
const {
  handleUserJoin,
  handleDisconnect,
} = require('../controllers/userController');

module.exports = (io) => {
  const users = {};
  const typingUsers = {};

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('user_join', (username) => {
      handleUserJoin(io, socket, users, username);
    });

    socket.on('send_message', (data) => {
      handleSendMessage(io, socket, users, data);
    });

    socket.on('typing', (isTyping) => {
      handleTyping(io, socket, typingUsers, isTyping, users);
    });

    socket.on('private_message', ({ to, message }) => {
      handlePrivateMessage(socket, to, message, users);
    });

    socket.on('disconnect', () => {
      handleDisconnect(io, socket, users, typingUsers);
    });
  });
};

// server/controllers/userController.js

const users = {};

const handleUserJoin = (io, socket, username) => {
  users[socket.id] = { id: socket.id, username };
  io.emit('user_list', Object.values(users));
  io.emit('user_joined', { username, id: socket.id });
  console.log(`${username} joined`);
};

const handleDisconnect = (io, socket) => {
  const user = users[socket.id];
  if (user) {
    io.emit('user_left', { username: user.username, id: socket.id });
    console.log(`${user.username} left`);
    delete users[socket.id];
    io.emit('user_list', Object.values(users));
  }
};

module.exports = {
  handleUserJoin,
  handleDisconnect,
};

// server/controllers/messageController.js

const Message = require('../models/Message');

// Save and broadcast a new message
const handleMessage = async (io, socket, messageData) => {
  try {
    const message = new Message({
      sender: socket.id,
      message: messageData.message, // ✅ Changed from 'text' to 'message'
      to: messageData.to || null,
      isPrivate: messageData.isPrivate || false,
      timestamp: new Date(),
    });

    await message.save();
    io.emit('receive_message', message);
  } catch (error) {
    console.error('❌ Error saving message:', error);
    socket.emit('error', 'Message not saved');
  }
};

// Fetch recent messages
const getRecentMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 }).limit(50);
    res.json(messages.reverse()); // Optional: send oldest first
  } catch (err) {
    console.error('❌ Error getting messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

module.exports = {
  handleMessage,
  getRecentMessages,
};

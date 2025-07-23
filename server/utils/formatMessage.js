// server/utils/formatMessage.js

function formatMessage({ sender, senderId, message, isPrivate = false }) {
  return {
    id: Date.now(),
    sender,
    senderId,
    message,
    timestamp: new Date().toISOString(),
    isPrivate,
  };
}

module.exports = {
  formatMessage,
};

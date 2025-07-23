// server/utils/validateUsername.js

function validateUsername(username) {
  const trimmed = username?.trim();
  return trimmed && trimmed.length >= 2 && trimmed.length <= 20;
}

module.exports = {
  validateUsername,
};

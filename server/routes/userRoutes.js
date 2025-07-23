const User = require('./models/User');

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('username socketId');
    res.json(users.map(user => ({ id: user.socketId, username: user.username })));
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

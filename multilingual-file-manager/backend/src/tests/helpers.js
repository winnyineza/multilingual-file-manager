const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const createTestUser = async () => {
  const hashedPassword = await bcrypt.hash('password123', 10);
  const result = await db.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    ['testuser', 'test@example.com', hashedPassword]
  );
  return { id: result.insertId, username: 'testuser', email: 'test@example.com' };
};

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

module.exports = {
  createTestUser,
  generateToken
}; 
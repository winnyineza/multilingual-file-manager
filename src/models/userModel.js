const db = require('../config/db');

const User = {
  create: async (userData) => {
    const [result] = await db.query('INSERT INTO users SET ?', userData);
    return { id: result.insertId, ...userData };
  },

  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }
};

module.exports = User;
const db = require('../config/db');
const withTransaction = require('../utils/transaction');

const File = {
  create: async (fileData) => {
    return withTransaction(async (connection) => {
      const [result] = await connection.query(
        'INSERT INTO files SET ?',
        fileData
      );
      return { id: result.insertId, ...fileData };
    });
  },

  findById: async (id) => {
    const [rows] = await db.query(
      'SELECT * FROM files WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  update: async (id, fileData) => {
    return withTransaction(async (connection) => {
      await connection.query(
        'UPDATE files SET ? WHERE id = ?',
        [fileData, id]
      );
      return { id, ...fileData };
    });
  },

  delete: async (id) => {
    return withTransaction(async (connection) => {
      await connection.query(
        'DELETE FROM files WHERE id = ?',
        [id]
      );
    });
  }
};

module.exports = File;

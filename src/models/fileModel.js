const db = require('../config/db');

const File = {
  create: async (fileData) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO files SET ?', fileData, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM files WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },
  update: async (id, fileData) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE files SET ? WHERE id = ?', [fileData, id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  delete: async (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM files WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};

module.exports = File;

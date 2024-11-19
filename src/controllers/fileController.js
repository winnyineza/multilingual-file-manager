const File = require('../models/fileModel');

const fileController = {
  create: async (req, res) => {
    try {
      const fileData = req.body;
      const result = await File.create(fileData);
      res.status(201).json({ message: 'File created successfully.', id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getById: async (req, res) => {
    try {
      const file = await File.findById(req.params.id);
      res.json(file);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      await File.update(req.params.id, req.body);
      res.json({ message: 'File updated successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      await File.delete(req.params.id);
      res.json({ message: 'File deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = fileController;

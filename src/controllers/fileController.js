const FileService = require('../services/fileService');

const fileController = {
  create: async (req, res, next) => {
    try {
      const result = await FileService.createFile(req.body);
      res.status(201).json({ 
        message: req.t('file_created'),
        id: result.insertId 
      });
    } catch (error) {
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const file = await FileService.getFile(req.params.id);
      res.json(file);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res) => {
    try {
      await FileService.updateFile(req.params.id, req.body);
      res.json({ message: 'File updated successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      await FileService.deleteFile(req.params.id);
      res.json({ message: 'File deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = fileController;

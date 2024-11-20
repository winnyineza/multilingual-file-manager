const fileService = require('../services/fileService');

const fileController = {
  async upload(req, res) {
    try {
      const file = req.file;
      const userId = req.user.id;
      const result = await fileService.uploadFile(file, userId);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getFiles(req, res) {
    try {
      const userId = req.user.id;
      const files = await fileService.getUserFiles(userId);
      res.json(files);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = fileController;

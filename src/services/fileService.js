const File = require('../models/fileModel');
const fileQueue = require('../queues');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

class FileService {
  async createFile(fileData) {
    try {
      const result = await File.create(fileData);
      await fileQueue.add('processFile', { fileId: result.insertId });
      return result;
    } catch (error) {
      logger.error('File creation failed:', error);
      if (error.code === 'ER_DUP_ENTRY') {
        throw new AppError('file_already_exists', 400);
      }
      throw new AppError('file_creation_failed', 500);
    }
  }

  async getFile(id) {
    const file = await File.findById(id);
    if (!file) {
      throw new AppError('file_not_found', 404);
    }
    return file;
  }

  async updateFile(id, fileData) {
    try {
      const file = await this.getFile(id);
      return await File.update(id, fileData);
    } catch (error) {
      logger.error('File update failed:', error);
      throw new AppError('file_update_failed', 500);
    }
  }

  async deleteFile(id) {
    try {
      const file = await this.getFile(id);
      await File.delete(id);
    } catch (error) {
      logger.error('File deletion failed:', error);
      throw new AppError('file_deletion_failed', 500);
    }
  }
}

module.exports = new FileService(); 
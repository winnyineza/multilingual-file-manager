const File = require('../models/fileModel');
const AppError = require('../utils/AppError');

class SearchService {
  async searchFiles(query, userId) {
    try {
      const searchQuery = `%${query}%`;
      const [files] = await db.query(
        `SELECT * FROM files 
         WHERE user_id = ? 
         AND (name LIKE ? OR path LIKE ?)`,
        [userId, searchQuery, searchQuery]
      );
      return files;
    } catch (error) {
      throw new AppError('search_failed', 500);
    }
  }
}

module.exports = new SearchService(); 
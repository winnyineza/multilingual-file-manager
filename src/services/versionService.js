const FileVersion = require('../models/fileVersionModel');
const AppError = require('../utils/AppError');

class VersionService {
  async createVersion(fileId, path) {
    try {
      const latestVersion = await this.getLatestVersion(fileId);
      const versionNumber = latestVersion 
        ? this.incrementVersion(latestVersion.version_number)
        : '1.0.0';

      return await FileVersion.create({
        file_id: fileId,
        path,
        version_number: versionNumber
      });
    } catch (error) {
      throw new AppError('version_creation_failed', 500);
    }
  }

  async getVersions(fileId) {
    return await FileVersion.findByFileId(fileId);
  }

  incrementVersion(version) {
    const [major, minor, patch] = version.split('.').map(Number);
    return `${major}.${minor}.${patch + 1}`;
  }
}

module.exports = new VersionService(); 
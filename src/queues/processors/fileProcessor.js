const File = require('../../models/fileModel');
const logger = require('../../utils/logger');
const { uploadToCloud } = require('../../services/cloudStorage');

async function processFile(job) {
  const { fileId } = job.data;
  logger.info(`Processing file ${fileId}`);

  try {
    // Get file details
    const file = await File.findById(fileId);
    if (!file) {
      throw new Error('File not found');
    }

    // Validate file
    await validateFile(file.path);

    // Upload to cloud storage if configured
    if (process.env.CLOUD_STORAGE_ENABLED === 'true') {
      const cloudUrl = await uploadToCloud(file.path);
      await File.update(fileId, { cloudUrl });
    }

    // Update processing status
    await File.update(fileId, { status: 'processed' });
    logger.info(`File ${fileId} processed successfully`);

  } catch (error) {
    logger.error(`Error processing file ${fileId}:`, error);
    await File.update(fileId, { status: 'error', error: error.message });
    throw error;
  }
}

module.exports = processFile; 
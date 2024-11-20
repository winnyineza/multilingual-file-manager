const AWS = require('aws-sdk');
const fs = require('fs').promises;
const logger = require('../utils/logger');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const uploadToCloud = async (filePath) => {
  try {
    const fileContent = await fs.readFile(filePath);
    const fileName = filePath.split('/').pop();

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${fileName}`,
      Body: fileContent
    };

    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    logger.error('Cloud upload failed:', error);
    throw error;
  }
};

module.exports = { uploadToCloud }; 
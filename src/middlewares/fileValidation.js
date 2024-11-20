const AppError = require('../utils/AppError');

const validateFileUpload = (req, res, next) => {
  if (!req.file) {
    throw new AppError('No file uploaded', 400);
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(req.file.mimetype)) {
    throw new AppError('Invalid file type', 400);
  }

  if (req.file.size > process.env.MAX_FILE_SIZE) {
    throw new AppError('File too large', 400);
  }

  next();
};

module.exports = validateFileUpload; 
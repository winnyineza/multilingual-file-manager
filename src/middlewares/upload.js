const multer = require('multer');
const path = require('path');
const AppError = require('../utils/AppError');

const storage = multer.diskStorage({
  destination: process.env.UPLOAD_DIR,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) }
});

module.exports = upload; 
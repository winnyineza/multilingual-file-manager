const redis = require("../config/redis");
const File = require("../models/file");

const fileService = {
  async uploadFile(file, userId) {
    // Add to upload queue
    await redis.lpush("upload_queue", JSON.stringify({ file, userId }));
    return { message: "File queued for upload" };
  },

  async getUserFiles(userId) {
    return await File.findByUserId(userId);
  },
};

module.exports = fileService;

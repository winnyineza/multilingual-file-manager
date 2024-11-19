const Queue = require('bull');
const fileQueue = new Queue('file uploads');

fileQueue.process(async (job) => {
  // Handle file upload logic here
});

module.exports = fileQueue;

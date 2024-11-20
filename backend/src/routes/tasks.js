const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.use(authMiddleware);
router.get("/status/:taskId", taskController.getStatus);
router.get("/progress/:taskId", taskController.getProgress);

module.exports = router;

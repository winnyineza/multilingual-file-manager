const express = require("express");
const authRoutes = require("./auth");
const fileRoutes = require("./files");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/files", fileRoutes);

module.exports = router;

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/auth");

const authController = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await hashPassword(password);
      const userId = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "User registered successfully", userId });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = authController;

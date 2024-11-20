const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const userController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(req.body);
      await User.register(username, password);
      res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findByUsername(username);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = userController;
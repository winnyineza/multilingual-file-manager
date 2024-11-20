const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/AppError');

class UserService {
  async createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await User.create({
      ...userData,
      password: hashedPassword
    });
    return user;
  }

  async loginUser({ email, password }) {
    const user = await User.findByEmail(email);
    if (!user) {
      throw new AppError('invalid_credentials', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError('invalid_credentials', 401);
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { token, user };
  }
}

module.exports = new UserService(); 
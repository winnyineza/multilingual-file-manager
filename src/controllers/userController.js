const UserService = require('../services/userService');
const AppError = require('../utils/AppError');

const userController = {
  register: async (req, res, next) => {
    try {
      const user = await UserService.createUser(req.body);
      res.status(201).json({
        message: req.t('user_created'),
        userId: user.id
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { token, user } = await UserService.loginUser(req.body);
      res.json({
        message: req.t('login_success'),
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;
const AppError = require('../utils/AppError');

const checkRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError('unauthorized_access', 403);
    }
    next();
  };
};

module.exports = checkRole; 
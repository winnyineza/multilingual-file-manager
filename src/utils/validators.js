const Joi = require('joi');

const validators = {
  fileCreate: Joi.object({
    name: Joi.string().required(),
    path: Joi.string().required(),
    user_id: Joi.number().required()
  }),

  userRegister: Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required()
  })
};

module.exports = validators; 
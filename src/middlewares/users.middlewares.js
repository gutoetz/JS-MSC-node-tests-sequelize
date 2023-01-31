const Joi = require('joi');
const { User } = require('../models');

const userSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().label('email'),
    displayName: Joi.string().min(8).required().label('displayName'),
    password: Joi.string().min(6).required().label('password'),
}).messages({
    'any.required': '{{#label}} is required',
  });

const newUserValidate = async (req, res, next) => {
  const { email, password, displayName } = req.body;

  const { error } = userSchema.validate({ email, password, displayName });
  if (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
  const emailAlreadyUsed = await User.findOne({
    where: { email },
  });
 if (emailAlreadyUsed) {
 return res.status(409).json({
    message: 'User already registered',
  }); 
}
  next();
};

module.exports = newUserValidate;

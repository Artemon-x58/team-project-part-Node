const Joi = require("joi");
const {
  validGoals,
  validKefs,
  emailRegexp,
  nameRegexp,
  passwordRegexp,
  nameMessage,
  emailMessage,
  passwordMessage,
} = require("./regexpList");

const registerAndLoginSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).required().messages(nameMessage),
  email: Joi.string().pattern(emailRegexp).required().messages(emailMessage),
  password: Joi.string()
    .pattern(passwordRegexp)
    .required()
    .messages(passwordMessage),
  age: Joi.number().integer().min(1).max(110).required(),
  weight: Joi.number().min(5).max(300).required(),
  height: Joi.number().min(50).max(240).required(),
  kef: Joi.number()
    .valid(...validKefs)
    .required(),
  gender: Joi.string().required(),
  yourGoal: Joi.string()
    .valid(...validGoals)
    .required(),
});

const newPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string()
    .pattern(passwordRegexp)
    .required()
    .messages(passwordMessage),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages(emailMessage),
  password: Joi.string()
    .pattern(passwordRegexp)
    .required()
    .messages(passwordMessage),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages(emailMessage),
});

const updateUserSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).required().messages(nameMessage),
  age: Joi.number().min(1).max(110).required(),
  weight: Joi.number().min(5).max(300).required(),
  height: Joi.number().min(50).max(240).required(),
  kef: Joi.number()
    .valid(...validKefs)
    .required(),
  gender: Joi.string().required(),
});

module.exports = {
  registerAndLoginSchema,
  loginSchema,
  emailSchema,
  updateUserSchema,
  newPasswordSchema,
};

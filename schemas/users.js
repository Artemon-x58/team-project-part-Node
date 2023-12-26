const Joi = require("joi");
const {
  validGoals,
  validKefs,
  emailRegexp,
  nameRegexp,
} = require("./regexpList");

const registerAndLoginSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).required().messages({
    "string.base": "Name must be a string.",
    "any.required": "Name field is required.",
    "string.empty": "Name must not be empty.",
    "string.pattern.base":
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": "Email must be a string.",
    "any.required": "The Email field is required.",
    "string.empty": "Email must not be empty.",
    "string.pattern.base": "Email must be in the format test@gmail.com.",
  }),
  password: Joi.string().min(6).required(),
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

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": "Email must be a string.",
    "any.required": "The Email field is required.",
    "string.empty": "Email must not be empty.",
    "string.pattern.base": "Email must be in the format test@gmail.com.",
  }),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.base": "Email must be a string.",
    "any.required": "The Email field is required.",
    "string.empty": "Email must not be empty.",
    "string.pattern.base": "Email must be in the format test@gmail.com.",
  }),
});

const updateUserSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).required().messages({
    "string.base": "Name must be a string.",
    "any.required": "Name field is required.",
    "string.empty": "Name must not be empty.",
    "string.pattern.base":
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
  }),
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
};

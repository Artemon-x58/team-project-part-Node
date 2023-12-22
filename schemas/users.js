const Joi = require("joi");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const validKefs = [1.2, 1.375, 1.55, 1.725, 1.9];

const validGoals = ["lose fat", "maintain", "gain muscle"];

const registerAndLoginSchema = Joi.object({
  name: Joi.string()
    .required("Set name for user")
    .pattern(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  email: Joi.string().pattern(emailRegexp).required(),
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
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string()
    .required("Set name for user")
    .pattern(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
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

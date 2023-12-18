const Joi = require("joi");

const validGoals = ["lose fat", "maintain", "gain muscle"];

const goalSchema = Joi.object({
  goal: Joi.string()
    .valid(...validGoals)
    .required(),
});

module.exports = goalSchema;

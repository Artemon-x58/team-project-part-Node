const Joi = require("joi");

const validGoals = ["lose fat", "maintain", "gain muscle"];

const goalSchema = Joi.object({
  yourGoal: Joi.string()
    .valid(...validGoals)
    .required(),
});

module.exports = goalSchema;

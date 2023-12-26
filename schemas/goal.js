const Joi = require("joi");
const { validGoals } = require("./regexpList");

const goalSchema = Joi.object({
  yourGoal: Joi.string()
    .valid(...validGoals)
    .required(),
});

module.exports = goalSchema;

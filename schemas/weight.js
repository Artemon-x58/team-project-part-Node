const Joi = require("joi");

const weightSchema = Joi.object({
  weight: Joi.number().min(5).max(300).required(),
});

module.exports = weightSchema;

const Joi = require("joi");

const waterSchema = Joi.object({
  water: Joi.number().min(1).max(3000).required(),
  token: Joi.string().required(),
});

module.exports = waterSchema;

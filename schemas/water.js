const Joi = require("joi");

const waterSchema = Joi.object({
  water: Joi.number().integer().min(1).max(3000).required(),
});

module.exports = waterSchema;

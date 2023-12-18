const Joi = require("joi");

const validMeals = ["breakfast", "dinner", "lunch", "snack"];

const deleteDairySchema = Joi.object({
  meals: Joi.string()
    .valid(...validMeals)
    .required(),
});

module.exports = deleteDairySchema;

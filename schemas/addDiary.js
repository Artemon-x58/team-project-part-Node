const Joi = require("joi");

const validMeals = ["breakfast", "dinner", "lunch", "snack"];

const DairySchema = Joi.object({
  meals: Joi.string()
    .valid(...validMeals)
    .required(),
  entries: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      calories: Joi.number().min(0).max(10000).required(),
      carbohydrates: Joi.number().min(0).max(6000).required(),
      protein: Joi.number().min(0).max(2000).required(),
      fat: Joi.number().min(0).max(2000).required(),
    })
  ),
});

module.exports = DairySchema;




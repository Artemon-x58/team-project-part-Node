const Joi = require("joi");
const { monthsArray } = require("./regexpList");

const statisticsSchema = Joi.object({
  month: Joi.string()
    .valid(...monthsArray)
    .required(),
});

module.exports = statisticsSchema;

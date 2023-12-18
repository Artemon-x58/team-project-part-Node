const Joi = require("joi");

const monthsArray = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const statisticsSchema = Joi.object({
  month: Joi.string()
    .valid(...monthsArray)
    .required(),
});

module.exports = statisticsSchema;

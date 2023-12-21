const { HttpError } = require("../helpers");
const { NutrientsPerDay } = require("../models");

const addNutrientsPerDay = async (
  owner,
  meals,
  calories,
  carbohydrates,
  protein,
  fat
) => {
  const result = await NutrientsPerDay.findOneAndUpdate(
    { owner },
    {
      $inc: {
        [`${meals}.calories`]: calories,
        [`${meals}.carbohydrates`]: carbohydrates,
        [`${meals}.protein`]: protein,
        [`${meals}.fat`]: fat,
      },
    },
    { new: true }
  ).exec();
  if (!result) {
    throw HttpError(404);
  }
};

module.exports = addNutrientsPerDay;

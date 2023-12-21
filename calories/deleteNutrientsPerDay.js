const { NutrientsPerDay } = require("../models");

const deleteNutrientsPerDay = async (
  owner,
  meals,
  calories,
  carbohydrates,
  protein,
  fat
) => {
  await NutrientsPerDay.findOneAndUpdate(
    { owner },
    {
      $inc: {
        [`${meals}.calories`]: -calories,
        [`${meals}.carbohydrates`]: -carbohydrates,
        [`${meals}.protein`]: -protein,
        [`${meals}.fat`]: -fat,
      },
    },
    { new: true }
  ).exec();
};

module.exports = deleteNutrientsPerDay;

const { currentDate } = require("../helpers");
const { NutrientsPerDay } = require("../models");

const deleteNutrientsPerDay = async (
  owner,
  meals,
  calories,
  carbohydrates,
  protein,
  fat
) => {
  const today = currentDate();

  await NutrientsPerDay.findOneAndUpdate(
    { owner, [`${meals}.date`]: today },
    {
      $inc: {
        [`${meals}.$.calories`]: -calories,
        [`${meals}.$.carbohydrates`]: -carbohydrates,
        [`${meals}.$.protein`]: -protein,
        [`${meals}.$.fat`]: -fat,
      },
    },
    { new: true }
  ).exec();
};

module.exports = deleteNutrientsPerDay;

const { currentDate } = require("../helpers");
const { NutrientsPerDay } = require("../models");

const updateNutrientsPerDay = async (
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
    {}
  ).exec();
};

module.exports = updateNutrientsPerDay;

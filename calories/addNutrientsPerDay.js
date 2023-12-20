const { currentDate } = require("../helpers");
const { NutrientsPerDay } = require("../models");

const addNutrientsPerDay = async (
  owner,
  meals,
  calories,
  carbohydrates,
  protein,
  fat,
  date
) => {
  const today = currentDate();

  const existingNutrients = await NutrientsPerDay.findOne({
    owner,
    [meals]: {
      $elemMatch: {
        date: today,
      },
    },
  }).exec();

  if (existingNutrients && date === today) {
    await NutrientsPerDay.findOneAndUpdate(
      { owner, [`${meals}.date`]: today },
      {
        $inc: {
          [`${meals}.$.calories`]: calories,
          [`${meals}.$.carbohydrates`]: carbohydrates,
          [`${meals}.$.protein`]: protein,
          [`${meals}.$.fat`]: fat,
        },
      },
      { new: true }
    ).exec();
  } else {
    await NutrientsPerDay.findOneAndUpdate(
      { owner },
      {
        $push: {
          [meals]: {
            calories,
            carbohydrates,
            protein,
            fat,
            date,
          },
        },
      },
      { new: true, upsert: true }
    ).exec();
  }
};

module.exports = addNutrientsPerDay;

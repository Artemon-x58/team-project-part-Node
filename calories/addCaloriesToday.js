const { currentDate } = require("../helpers");
const { Calories } = require("../models");

const addCaloriesToday = async (
  owner,
  calories,
  carbohydrates,
  protein,
  fat,
  date
) => {
  const today = currentDate();

  const existingCalories = await Calories.findOne({
    owner,
    "caloriesAndDate.date": today,
  });
  if (existingCalories && date === today) {
    await Calories.findOneAndUpdate(
      { owner, "caloriesAndDate.date": today },
      {
        $inc: {
          "caloriesAndDate.$.calories": calories,
          "caloriesAndDate.$.carbohydrates": carbohydrates,
          "caloriesAndDate.$.protein": protein,
          "caloriesAndDate.$.fat": fat,
        },
      },
      { new: true }
    ).exec();
  } else {
    await Calories.findOneAndUpdate(
      { owner },
      {
        $push: {
          caloriesAndDate: {
            calories,
            carbohydrates,
            protein,
            fat,
            date: date,
          },
        },
      },
      { new: true, upsert: true }
    ).exec();
  }
};

module.exports = addCaloriesToday;

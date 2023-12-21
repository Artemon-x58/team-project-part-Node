const { currentDate, HttpError } = require("../helpers");
const { Calories } = require("../models");

const today = currentDate();

const deleteCaloriesToday = async (
  owner,
  calories,
  carbohydrates,
  protein,
  fat
) => {
  const existingCalories = await Calories.findOne({
    owner,
    "caloriesAndDate.date": today,
  });
  if (!existingCalories) {
    throw HttpError(404);
  }
  await Calories.findOneAndUpdate(
    { owner, "caloriesAndDate.date": today },
    {
      $inc: {
        "caloriesAndDate.$.calories": -calories,
        "caloriesAndDate.$.carbohydrates": -carbohydrates,
        "caloriesAndDate.$.protein": -protein,
        "caloriesAndDate.$.fat": -fat,
      },
    },
    { new: true }
  ).exec();
};

module.exports = deleteCaloriesToday;

const {
  currentDate,
  HttpError,
  funcToFixed,
  sumObjectProperties,
} = require("../../helpers");
const { Meals, NutrientsPerDay, Calories } = require("../../models");

const deleteDiary = async (req, res) => {
  const { id: owner } = req.user;
  const meals = req.query.meals;
  const date = currentDate();

  const existingDiary = await Meals.findOneAndUpdate(
    { owner },
    {
      $set: {
        [meals]: [],
      },
    }
  ).exec();
  if (!existingDiary) {
    throw HttpError(404, "Meals not found");
  }

  const { calories, carbohydrates, protein, fat } = sumObjectProperties(
    existingDiary[meals]
  );
  const resultNutrients = await NutrientsPerDay.findOneAndUpdate(
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
  if (!resultNutrients) {
    throw HttpError(404);
  }

  const resultCalories = await Calories.findOneAndUpdate(
    { owner, "caloriesAndDate.date": date },
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
  if (!resultCalories) {
    throw HttpError(404, "Calories not found");
  }
  const nutrientsPerDay = await NutrientsPerDay.findOne({
    owner,
  }).exec();
  if (!nutrientsPerDay) {
    throw HttpError(404, "Nutrients not found");
  }

  const { caloriesAndDate } = await Calories.findOne({
    owner,
    "caloriesAndDate.date": date,
  }).exec();
  if (!caloriesAndDate) {
    throw HttpError(404, "Calories not found");
  }

  const newCaloriesAndDate = caloriesAndDate[0];

  res.json({
    newCaloriesAndDate: funcToFixed(newCaloriesAndDate),
    [meals]: funcToFixed(nutrientsPerDay[meals], true),
  });
};

module.exports = deleteDiary;

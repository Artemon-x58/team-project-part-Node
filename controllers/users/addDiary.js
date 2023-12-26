const {
  currentDate,
  HttpError,
  funcToFixed,
  sumObjectProperties,
} = require("../../helpers");
const { Meals, Calories, NutrientsPerDay } = require("../../models");

const addDiary = async (req, res) => {
  const { id: owner } = req.user;
  const date = currentDate();
  const { meals, entries } = req.body;

  const result = await Meals.findOneAndUpdate(
    { owner },
    {
      $push: {
        [meals]: { $each: entries.map((entry) => ({ ...entry })) },
      },
    },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, "Meals not found");
  }

  const { calories, carbohydrates, protein, fat } =
    sumObjectProperties(entries);

  const resultCalories = await Calories.findOneAndUpdate(
    { owner, "caloriesAndDate.date": date },
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

  if (!resultCalories) {
    throw HttpError(404, "Calories not found");
  }

  const resultCaloriesToday = await Calories.findOne({
    owner,
    "caloriesAndDate.date": date,
  })
    .select("caloriesAndDate.$")
    .exec();
  if (!resultCaloriesToday) {
    throw HttpError(404, "Calories not found");
  }
  const newCaloriesAndDate = resultCaloriesToday.caloriesAndDate[0];

  const resultNutrients = await NutrientsPerDay.findOneAndUpdate(
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
  if (!resultNutrients) {
    throw HttpError(404);
  }

  const nutrientsPerDay = await NutrientsPerDay.findOne({
    owner,
  }).exec();

  if (!nutrientsPerDay) {
    throw HttpError(404, "Nutrients not found");
  }
  res.status(201).json({
    newCaloriesAndDate: {
      newCaloriesAndDate: funcToFixed(newCaloriesAndDate),
    },
    [meals]: result[meals],
    newSumNutrientsPerDay: funcToFixed(nutrientsPerDay[meals], true),
  });
};

module.exports = addDiary;

const { sumObjectProperties, addCaloriesToday } = require("../../calories");
const { currentDate, HttpError, funcToFixed } = require("../../helpers");
const { Meals, Calories, NutrientsPerDay } = require("../../models");
const { addNutrientsPerDay } = require("../../nutrients");

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
  console.log(calories, carbohydrates, protein, fat);
  await addCaloriesToday(owner, calories, carbohydrates, protein, fat);

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

  await addNutrientsPerDay(owner, meals, calories, carbohydrates, protein, fat);

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

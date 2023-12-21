const {
  sumObjectProperties,
  addCaloriesToday,
  addNutrientsPerDay,
} = require("../../calories");
const { currentDate, HttpError } = require("../../helpers");
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
    throw HttpError(404);
  }

  const { calories, carbohydrates, protein, fat } =
    sumObjectProperties(entries);

  await addCaloriesToday(owner, calories, carbohydrates, protein, fat);

  const resultCaloriesToday = await Calories.findOne({
    owner,
    "caloriesAndDate.date": date,
  })
    .select("caloriesAndDate.$")
    .exec();
  if (!resultCaloriesToday) {
    throw HttpError(404);
  }
  const newCaloriesAndDate = resultCaloriesToday.caloriesAndDate[0];

  await addNutrientsPerDay(owner, meals, calories, carbohydrates, protein, fat);

  const nutrientsPerDay = await NutrientsPerDay.findOne({
    owner,
  }).exec();

  if (!nutrientsPerDay) {
    throw HttpError(404);
  }

  res.status(201).json({
    newCaloriesAndDate,
    [meals]: result[meals],
    newSumNutrientsPerDay: {
      calories: nutrientsPerDay[meals].calories,
      carbohydrates: nutrientsPerDay[meals].carbohydrates,
      protein: nutrientsPerDay[meals].protein,
      fat: nutrientsPerDay[meals].fat,
    },
  });
};

module.exports = addDiary;

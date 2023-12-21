const {
  deleteCaloriesToday,
  deleteNutrientsPerDay,
} = require("../../calories");
const sumObjectProperties = require("../../calories/sumObjectProperties");
const { currentDate } = require("../../helpers");
const { Meals, NutrientsPerDay, Calories } = require("../../models");

const deleteDiary = async (req, res) => {
  const { id: owner } = req.user;
  const { meals } = req.body;
  const date = currentDate();

  const existingDiary = await Meals.findOneAndUpdate(
    { owner },
    {
      $set: {
        [meals]: [],
      },
    }
  ).exec();

  const { calories, carbohydrates, protein, fat } = sumObjectProperties(
    existingDiary[meals]
  );
  await deleteNutrientsPerDay(
    owner,
    meals,
    calories,
    carbohydrates,
    protein,
    fat
  );

  await deleteCaloriesToday(owner, calories, carbohydrates, protein, fat);

  const nutrientsPerDay = await NutrientsPerDay.findOne({
    owner,
  }).exec();

  const { caloriesAndDate } = await Calories.findOne({
    owner,
    "caloriesAndDate.date": date,
  }).exec();
  const newCaloriesAndDate = caloriesAndDate[0];

  res.json({
    newCaloriesAndDate,
    [meals]: {
      calories: nutrientsPerDay[meals].calories,
      carbohydrates: nutrientsPerDay[meals].carbohydrates,
      protein: nutrientsPerDay[meals].protein,
      fat: nutrientsPerDay[meals].fat,
    },
    newListMeals: [],
  });
};

module.exports = deleteDiary;

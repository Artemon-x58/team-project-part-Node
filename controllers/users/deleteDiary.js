const { deleteCaloriesToday } = require("../../calories");
const sumObjectProperties = require("../../calories/sumObjectProperties");
const { currentDate, HttpError } = require("../../helpers");
const { Meals, NutrientsPerDay, Calories } = require("../../models");
const { deleteNutrientsPerDay } = require("../../nutrients");

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
  if (!existingDiary) {
    throw HttpError(404, "Meals not found");
  }

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
    newCaloriesAndDate: {
      newCaloriesAndDate: {
        calories: parseFloat(newCaloriesAndDate.calories.toFixed(2)),
        carbohydrates: parseFloat(newCaloriesAndDate.carbohydrates.toFixed(2)),
        protein: parseFloat(newCaloriesAndDate.protein.toFixed(2)),
        fat: parseFloat(newCaloriesAndDate.fat.toFixed(2)),
      },
    },
    [meals]: {
      carbohydrates: parseFloat(
        nutrientsPerDay[meals].carbohydrates.toFixed(2)
      ),
      protein: parseFloat(nutrientsPerDay[meals].protein.toFixed(2)),
      fat: parseFloat(nutrientsPerDay[meals].fat.toFixed(2)),
    },
  });
};

module.exports = deleteDiary;

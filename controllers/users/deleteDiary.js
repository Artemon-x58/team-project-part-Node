const {
  deleteCaloriesToday,
  deleteNutrientsPerDay,
} = require("../../calories");
const sumObjectProperties = require("../../calories/sumObjectProperties");
const { currentDate } = require("../../helpers");
const { Meals, NutrientsPerDay } = require("../../models");

const deleteDiary = async (req, res) => {
  const { id: owner } = req.user;
  const { meals } = req.body;

  const today = currentDate();

  const existingDiary = await Meals.findOneAndUpdate(
    { owner },
    {
      $set: {
        [meals]: [],
      },
    }
  ).exec();

  const filteredEntries = existingDiary[meals].filter(
    (item) => item.date === today
  );

  const { calories, carbohydrates, protein, fat } =
    sumObjectProperties(filteredEntries);
  await deleteNutrientsPerDay(
    owner,
    meals,
    calories,
    carbohydrates,
    protein,
    fat
  );

  deleteCaloriesToday(owner, calories, carbohydrates, protein, fat);

  const promise = await NutrientsPerDay.findOne({
    owner,
    meals: {
      $elemMatch: {
        date: today,
      },
    },
  }).exec();

  let caloriesPerDay, carbohydratesPerDay, proteinPerDay, fatPerDay;
  promise[meals].map((item) => {
    caloriesPerDay = item.calories;
    carbohydratesPerDay = item.carbohydrates;
    proteinPerDay = item.protein;
    fatPerDay = item.fat;
    return true;
  });
  const newListMeals = await Meals.findOne({ owner });
  res.json({
    [meals]: {
      calories: caloriesPerDay,
      carbohydrates: carbohydratesPerDay,
      protein: proteinPerDay,
      fat: fatPerDay,
    },
    newListMeals: newListMeals[meals],
  });
};

module.exports = deleteDiary;

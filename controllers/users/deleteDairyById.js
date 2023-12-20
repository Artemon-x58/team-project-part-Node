const {
  deleteCaloriesToday,
  sumObjectProperties,
  deleteNutrientsPerDay,
} = require("../../calories");
const { currentDate } = require("../../helpers");
const { Diary, NutrientsPerDay } = require("../../models");

const deleteDairyById = async (req, res) => {
  const { id: newId } = req.params;
  const { id: owner } = req.user;
  const { meals } = req.body;

  const today = currentDate();

  const result = await Diary.findOneAndUpdate(
    { owner },
    { $pull: { [meals]: { _id: newId } } }
  ).exec();

  const filteredEntries = result[meals].filter((item) => item.id === newId);

  const { calories, carbohydrates, protein, fat } =
    sumObjectProperties(filteredEntries);

  deleteCaloriesToday(owner, calories, carbohydrates, protein, fat);
  await deleteNutrientsPerDay(
    owner,
    meals,
    calories,
    carbohydrates,
    protein,
    fat
  );

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

  console.log(promise);

  res.json({
    [meals]: {
      calories: caloriesPerDay,
      carbohydrates: carbohydratesPerDay,
      protein: proteinPerDay,
      fat: fatPerDay,
    },
  });
};

module.exports = deleteDairyById;

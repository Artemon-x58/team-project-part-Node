const {
  deleteCaloriesToday,
  sumObjectProperties,
  deleteNutrientsPerDay,
} = require("../../calories");
const { currentDate } = require("../../helpers");
const { Meals, NutrientsPerDay } = require("../../models");

const deleteDairyById = async (req, res) => {
  const { id: newId } = req.params;
  const { id: owner } = req.user;
  const { meals } = req.body;

  const today = currentDate();

  const result = await Meals.findOneAndUpdate(
    { owner },
    { $pull: { [meals]: { _id: newId } } }
  ).exec();

  const filteredEntries = result[meals].filter(
    (item) => item._id.toString() === newId
  );

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

  const nutrientsPerDay = await NutrientsPerDay.findOne({
    owner,
    [`${meals}.date`]: today,
  }).exec();

  const {
    calories: caloriesPerDay,
    carbohydrates: carbohydratesPerDay,
    protein: proteinPerDay,
    fat: fatPerDay,
  } = nutrientsPerDay && nutrientsPerDay[meals][0];

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

module.exports = deleteDairyById;

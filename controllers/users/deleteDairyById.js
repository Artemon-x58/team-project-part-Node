const {
  deleteCaloriesToday,
  deleteNutrientsPerDay,
} = require("../../calories");
const { Meals, NutrientsPerDay } = require("../../models");

const deleteDairyById = async (req, res) => {
  const { id: newId } = req.params;
  const { id: owner } = req.user;
  const { meals } = req.body;

  const result = await Meals.findOneAndUpdate(
    { owner },
    { $pull: { [meals]: { _id: newId } } }
  ).exec();

  const filteredEntries = result[meals].filter(
    (item) => item._id.toString() === newId
  );

  const { calories, carbohydrates, protein, fat } = filteredEntries[0];

  await deleteCaloriesToday(owner, calories, carbohydrates, protein, fat);
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
  }).exec();

  const newListMeals = await Meals.findOne({ owner });

  res.json({
    [meals]: {
      calories: nutrientsPerDay[meals].calories,
      carbohydrates: nutrientsPerDay[meals].carbohydrates,
      protein: nutrientsPerDay[meals].protein,
      fat: nutrientsPerDay[meals].fat,
    },
    newListMeals: newListMeals[meals],
  });
};

module.exports = deleteDairyById;

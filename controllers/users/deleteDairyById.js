const { deleteCaloriesToday } = require("../../calories");
const { HttpError } = require("../../helpers");
const { Meals, NutrientsPerDay } = require("../../models");
const { deleteNutrientsPerDay } = require("../../nutrients");

const deleteDairyById = async (req, res) => {
  const { id: newId } = req.params;
  const { id: owner } = req.user;
  const { meals } = req.body;

  const result = await Meals.findOneAndUpdate(
    { owner },
    { $pull: { [meals]: { _id: newId } } }
  ).exec();
  if (!result) {
    throw HttpError(404);
  }

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

  if (!nutrientsPerDay) {
    throw HttpError(404);
  }

  const newListMeals = await Meals.findOne({ owner });
  if (!newListMeals) {
    throw HttpError(404);
  }

  res.json({
    [meals]: {
      carbohydrates: nutrientsPerDay[meals].carbohydrates,
      protein: nutrientsPerDay[meals].protein,
      fat: nutrientsPerDay[meals].fat,
    },
    newListMeals: newListMeals[meals],
  });
};

module.exports = deleteDairyById;

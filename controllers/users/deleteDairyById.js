const { HttpError, funcToFixed, currentDate } = require("../../helpers");
const { Meals, NutrientsPerDay, Calories } = require("../../models");

const deleteDairyById = async (req, res) => {
  const { id: newId } = req.params;
  const { id: owner } = req.user;
  const meals = req.query.meals;
  const date = currentDate();

  const result = await Meals.findOneAndUpdate(
    { owner },
    { $pull: { [meals]: { _id: newId } } }
  ).exec();
  if (!result) {
    throw HttpError(404, "Meals not found");
  }

  const filteredEntries = result[meals].filter(
    (item) => item._id.toString() === newId
  );

  const { calories, carbohydrates, protein, fat } = filteredEntries[0];

  const resultCalories = await Calories.findOneAndUpdate(
    { owner, "caloriesAndDate.date": date },
    {
      $inc: {
        "caloriesAndDate.$.calories": -calories,
        "caloriesAndDate.$.carbohydrates": -carbohydrates,
        "caloriesAndDate.$.protein": -protein,
        "caloriesAndDate.$.fat": -fat,
      },
    },
    { new: true }
  ).exec();
  if (!resultCalories) {
    throw HttpError(404, "Calories not found");
  }
  const resultNutrients = await NutrientsPerDay.findOneAndUpdate(
    { owner },
    {
      $inc: {
        [`${meals}.calories`]: -calories,
        [`${meals}.carbohydrates`]: -carbohydrates,
        [`${meals}.protein`]: -protein,
        [`${meals}.fat`]: -fat,
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

  const newListMeals = await Meals.findOne({ owner });
  if (!newListMeals) {
    throw HttpError(404, "Meals not found");
  }

  res.json({
    [meals]: newListMeals[meals],
    newSumNutrientsPerDay: funcToFixed(nutrientsPerDay[meals], true),
  });
};

module.exports = deleteDairyById;

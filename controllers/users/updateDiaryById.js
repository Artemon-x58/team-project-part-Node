const { currentDate, HttpError, funcToFixed } = require("../../helpers");
const { Meals, NutrientsPerDay, Calories } = require("../../models");

const updateDiaryById = async (req, res) => {
  const { id: newId } = req.params;
  const { id: owner } = req.user;
  const { meals, calories, carbohydrates, protein, fat } = req.body;
  const date = currentDate();

  const result = await Meals.findOneAndUpdate(
    { owner, [`${meals}._id`]: newId },
    {
      $set: {
        [`${meals}.$`]: req.body,
      },
    }
  ).exec();
  if (!result) {
    throw HttpError(404, "Meals not found");
  }

  const oldProduct = result[meals].find(
    (item) => item._id.toString() === newId
  );

  const resultCaloriesDelete = await Calories.findOneAndUpdate(
    { owner, "caloriesAndDate.date": date },
    {
      $inc: {
        "caloriesAndDate.$.calories": -oldProduct.calories,
        "caloriesAndDate.$.carbohydrates": -oldProduct.carbohydrates,
        "caloriesAndDate.$.protein": -oldProduct.protein,
        "caloriesAndDate.$.fat": -oldProduct.fat,
      },
    },
    { new: true }
  ).exec();
  if (!resultCaloriesDelete) {
    throw HttpError(404, "Calories not found");
  }
  const resultCaloriesAdd = await Calories.findOneAndUpdate(
    { owner, "caloriesAndDate.date": date },
    {
      $inc: {
        "caloriesAndDate.$.calories": calories,
        "caloriesAndDate.$.carbohydrates": carbohydrates,
        "caloriesAndDate.$.protein": protein,
        "caloriesAndDate.$.fat": fat,
      },
    },
    { new: true }
  ).exec();

  if (!resultCaloriesAdd) {
    throw HttpError(404, "Calories not found");
  }

  const resultNutrientsDelete = await NutrientsPerDay.findOneAndUpdate(
    { owner },
    {
      $inc: {
        [`${meals}.calories`]: -oldProduct.calories,
        [`${meals}.carbohydrates`]: -oldProduct.carbohydrates,
        [`${meals}.protein`]: -oldProduct.protein,
        [`${meals}.fat`]: -oldProduct.fat,
      },
    },
    { new: true }
  ).exec();
  if (!resultNutrientsDelete) {
    throw HttpError(404);
  }
  const resultNutrientsAdd = await NutrientsPerDay.findOneAndUpdate(
    { owner },
    {
      $inc: {
        [`${meals}.calories`]: calories,
        [`${meals}.carbohydrates`]: carbohydrates,
        [`${meals}.protein`]: protein,
        [`${meals}.fat`]: fat,
      },
    },
    { new: true }
  ).exec();
  if (!resultNutrientsAdd) {
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
    newSumNutrientsPerDay: funcToFixed(nutrientsPerDay[meals]),
  });
};

module.exports = updateDiaryById;

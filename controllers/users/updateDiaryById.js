const { deleteCaloriesToday, addCaloriesToday } = require("../../calories");
const { currentDate, HttpError } = require("../../helpers");
const { Meals, NutrientsPerDay } = require("../../models");
const {
  deleteNutrientsPerDay,
  addNutrientsPerDay,
} = require("../../nutrients");

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
    throw HttpError(404);
  }

  const oldProduct = result[meals].find(
    (item) => item._id.toString() === newId
  );

  await deleteCaloriesToday(
    owner,
    oldProduct.calories,
    oldProduct.carbohydrates,
    oldProduct.protein,
    oldProduct.fat
  );
  await addCaloriesToday(owner, calories, carbohydrates, protein, fat);

  await deleteNutrientsPerDay(
    owner,
    meals,
    oldProduct.calories,
    oldProduct.carbohydrates,
    oldProduct.protein,
    oldProduct.fat
  );
  await addNutrientsPerDay(
    owner,
    meals,
    calories,
    carbohydrates,
    protein,
    fat,
    date
  );

  const promise = await NutrientsPerDay.findOne({
    owner,
  }).exec();
  if (!promise) {
    throw HttpError(404);
  }

  const newListMeals = await Meals.findOne({ owner });
  if (!newListMeals) {
    throw HttpError(404);
  }

  res.json({
    [meals]: {
      carbohydrates: promise[meals].carbohydrates,
      protein: promise[meals].protein,
      fat: promise[meals].fat,
    },
    newListMeals: newListMeals[meals],
  });
};

module.exports = updateDiaryById;

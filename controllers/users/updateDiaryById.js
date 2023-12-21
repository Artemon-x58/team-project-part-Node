const {
  deleteCaloriesToday,
  addCaloriesToday,
  deleteNutrientsPerDay,
  addNutrientsPerDay,
} = require("../../calories");
const { currentDate } = require("../../helpers");
const { Meals, NutrientsPerDay } = require("../../models");

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
  const oldProduct = result[meals].find(
    (item) => item._id.toString() === newId
  );

  deleteCaloriesToday(
    owner,
    oldProduct.calories,
    oldProduct.carbohydrates,
    oldProduct.protein,
    oldProduct.fat
  );
  addCaloriesToday(owner, calories, carbohydrates, protein, fat);

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
  const newListMeals = await Meals.findOne({ owner });

  res.json({
    [meals]: {
      calories: promise[meals].calories,
      carbohydrates: promise[meals].carbohydrates,
      protein: promise[meals].protein,
      fat: promise[meals].fat,
    },
    newListMeals: newListMeals[meals],
  });
};

module.exports = updateDiaryById;

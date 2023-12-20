const {
  deleteCaloriesToday,
  addCaloriesToday,
  deleteNutrientsPerDay,
  addNutrientsPerDay,
} = require("../../calories");
const { HttpError, currentDate } = require("../../helpers");
const { Diary, NutrientsPerDay } = require("../../models");

const updateDiaryById = async (req, res) => {
  const { id: newId } = req.params;
  const { id: owner } = req.user;
  const { meals, calories, carbohydrates, protein, fat } = req.body;
  const date = currentDate();

  const result = await Diary.findOne({
    owner,
    [`${meals}._id`]: newId,
  }).exec();

  if (!result) {
    throw HttpError(404, "Diary not found");
  }

  const oldProduct = result[meals].find(
    (item) => item._id.toString() === newId
  );

  if (!oldProduct) {
    throw HttpError(404, "Product not found in the specified meal");
  }

  await Diary.update(
    { owner, [`${meals}._id`]: newId },
    {
      $set: {
        [`${meals}.$`]: req.body,
      },
    }
  ).exec();

  deleteCaloriesToday(
    owner,
    oldProduct.calories,
    oldProduct.carbohydrates,
    oldProduct.protein,
    oldProduct.fat
  );
  addCaloriesToday(owner, calories, carbohydrates, protein, fat, date);

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
    meals: {
      $elemMatch: {
        date: date,
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

  const newListMeals = await Diary.findOne({ owner });

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

module.exports = updateDiaryById;

const {
  addCaloriesToday,
  sumObjectProperties,
  addNutrientsPerDay,
} = require("../../calories");
const { currentDate } = require("../../helpers");
const { Diary, Calories, NutrientsPerDay } = require("../../models");

const addDiary = async (req, res) => {
  const { id: owner } = req.user;
  const date = currentDate();
  const entries = req.body;

  const results = {};

  for (const entry of entries) {
    const { meals, title, calories, carbohydrates, protein, fat } = entry;
    const result = await Diary.findOneAndUpdate(
      { owner },
      {
        $push: {
          [meals]: {
            title,
            calories,
            carbohydrates,
            protein,
            fat,
            date,
          },
        },
      },
      { new: true }
    ).exec();

    results[meals] = results[meals] || [];
    results[meals].push(result[meals][result[meals].length - 1]);
  }

  const sumNutrients = sumObjectProperties(req.body);
  const { calories, carbohydrates, protein, fat } = sumNutrients;

  await addCaloriesToday(owner, calories, carbohydrates, protein, fat);

  const { caloriesAndDate } = await Calories.findOne({
    owner,
    "caloriesAndDate.date": date,
  })
    .select("caloriesAndDate.$")
    .exec();
  const newCaloriesAndDate = caloriesAndDate[0];

  const key = Object.keys(results)[0];
  await addNutrientsPerDay(owner, key, calories, carbohydrates, protein, fat);

  const newNutrients = await NutrientsPerDay.findOne({
    owner,
  }).exec();
  const {
    calories: caloriesPerDay,
    carbohydrates: carbohydratesPerDay,
    protein: proteinPerDay,
    fat: fatPerDay,
  } = newNutrients[key];

  const newListMeals = await Diary.findOne({ owner }).exec();
  res.status(201).json({
    newCaloriesAndDate,
    [key]: {
      calories: caloriesPerDay,
      carbohydrates: carbohydratesPerDay,
      protein: proteinPerDay,
      fat: fatPerDay,
    },
    newListMeals: newListMeals[key],
  });
};

module.exports = addDiary;

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
  const promises = [];

  for (const entry of entries) {
    const { meals, title, calories, carbohydrates, protein, fat } = entry;
    const promise = Diary.findOneAndUpdate(
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

    promises.push(promise);
  }

  const existingDiaries = await Promise.all(promises);

  for (let i = 0; i < existingDiaries.length; i++) {
    const entry = existingDiaries[i];
    const { meals } = entries[i];

    if (!results[meals]) {
      results[meals] = [];
    }
    results[meals].push(entry[meals][entry[meals].length - 1]);
  }

  const sumNutrients = sumObjectProperties(req.body);
  const { calories, carbohydrates, protein, fat } = sumNutrients;

  await addCaloriesToday(owner, calories, carbohydrates, protein, fat, date);

  const { caloriesAndDate } = await Calories.findOne({
    owner,
    "caloriesAndDate.date": date,
  })
    .select("caloriesAndDate.$")
    .exec();
  const newCaloriesAndDate = caloriesAndDate[0];

  const key = Object.keys(results)[0];
  await addNutrientsPerDay(
    owner,
    key,
    calories,
    carbohydrates,
    protein,
    fat,
    date
  );
  const meals = await NutrientsPerDay.findOne({
    owner,
    [key]: {
      $elemMatch: {
        date: date,
      },
    },
  }).exec();
  let caloriesPerDay, carbohydratesPerDay, proteinPerDay, fatPerDay;
  meals[key].map((item) => {
    caloriesPerDay = item.calories;
    carbohydratesPerDay = item.carbohydrates;
    proteinPerDay = item.protein;
    fatPerDay = item.fat;
    return true;
  });

  res.status(201).json({
    data: results,
    newCaloriesAndDate,
    [key]: {
      calories: caloriesPerDay,
      carbohydrates: carbohydratesPerDay,
      protein: proteinPerDay,
      fat: fatPerDay,
    },
  });
};

module.exports = addDiary;

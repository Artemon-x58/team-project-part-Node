const { addCaloriesToday, sumObjectProperties } = require("../../calories");
const { currentDate } = require("../../helpers");
const { Diary } = require("../../models");

const addDiary = async (req, res) => {
  const { id: owner } = req.user;
  const date = currentDate();
  const entries = req.body;

  const results = {};

  for (const entry of entries) {
    const { meals, title, calories, carbohydrates, protein, fat } = entry;

    const existingDiary = await Diary.findOneAndUpdate(
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
    // Создаем структуру данных в объекте results
    if (!results[meals]) {
      results[meals] = [];
    }
    results[meals].push(existingDiary[meals][existingDiary[meals].length - 1]);
  }
  const sumNutrients = sumObjectProperties(req.body);
  const { calories, carbohydrates, protein, fat } = sumNutrients;

  addCaloriesToday(owner, calories, carbohydrates, protein, fat, date);

  res.status(201).json({ results });
};

module.exports = addDiary;

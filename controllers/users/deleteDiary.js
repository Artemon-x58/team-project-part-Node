const { deleteCaloriesToday } = require("../../calories");
const sumObjectProperties = require("../../calories/sumObjectProperties");
const { currentDate } = require("../../helpers");
const { Diary } = require("../../models");

const deleteDiary = async (req, res) => {
  const { id: owner } = req.user;
  const { meals } = req.body;

  const today = currentDate();

  const existingDiary = await Diary.findOneAndUpdate(
    { owner },
    {
      $set: {
        [meals]: [],
      },
    }
  ).exec();

  const filteredEntries = existingDiary[meals].filter(
    (item) => item.date === today
  );

  const { calories, carbohydrates, protein, fat } =
    sumObjectProperties(filteredEntries);

  deleteCaloriesToday(owner, calories, carbohydrates, protein, fat);
  res.json({ [meals]: [] });
};

module.exports = deleteDiary;

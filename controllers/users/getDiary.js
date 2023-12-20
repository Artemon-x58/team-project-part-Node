const { currentDate } = require("../../helpers");
const { Diary } = require("../../models");

const getDiary = async (req, res) => {
  const { id: owner } = req.user;

  const today = currentDate();

  const diary = await Diary.findOne({
    owner,
  }).exec();

  const findEntryByDate = (arr) => {
    return arr.filter((item) => item.date === today);
  };

  const breakfast = findEntryByDate(diary.breakfast);
  const lunch = findEntryByDate(diary.lunch);
  const dinner = findEntryByDate(diary.dinner);
  const snack = findEntryByDate(diary.snack);
  res.json({ breakfast, lunch, dinner, snack });
};

module.exports = getDiary;

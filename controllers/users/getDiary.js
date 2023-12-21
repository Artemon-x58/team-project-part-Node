const { HttpError } = require("../../helpers");
const { Diary } = require("../../models");

const getDiary = async (req, res) => {
  const { id: owner } = req.user;

  const diary = await Diary.findOne({
    owner,
  }).exec();

  if (!diary) {
    throw HttpError(404);
  }

  const breakfast = diary.breakfast;
  const lunch = diary.lunch;
  const dinner = diary.dinner;
  const snack = diary.snack;
  res.json({ breakfast, lunch, dinner, snack });
};

module.exports = getDiary;

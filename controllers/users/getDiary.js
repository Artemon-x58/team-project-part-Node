const { HttpError } = require("../../helpers");
const { Meals } = require("../../models");

const getDiary = async (req, res) => {
  const { id: owner } = req.user;

  const diary = await Meals.findOne({
    owner,
  }).exec();

  if (!diary) {
    throw HttpError(404, "Meals not found");
  }

  const breakfast = diary.breakfast;
  const lunch = diary.lunch;
  const dinner = diary.dinner;
  const snack = diary.snack;
  res.json({ breakfast, lunch, dinner, snack });
};

module.exports = getDiary;

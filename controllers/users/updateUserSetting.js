const { updateCalories } = require("../../calories");
const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const { updateWaterValue } = require("../../water");
const { updateWeightValue } = require("../../weight");

const updateUserSetting = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  }).exec();
  if (!user) {
    throw HttpError(404);
  }
  const { id, weight, kef, gender, height, age, yourGoal } = user;
  updateWaterValue(id, weight, kef);
  updateWeightValue(id, weight);
  updateCalories(id, gender, weight, height, kef, age, yourGoal);
  res.status(200).send({ code: 200, user });
};

module.exports = updateUserSetting;

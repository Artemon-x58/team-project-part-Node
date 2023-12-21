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
  const { id, name, weight, kef, gender, height, age, yourGoal } = user;
  updateWaterValue(id, weight, kef);
  updateWeightValue(id, weight);
  updateCalories(id, gender, weight, height, kef, age, yourGoal);
  console.log(user);
  res.status(200).json({ data: { name, weight, kef, gender, height, age } });
};

module.exports = updateUserSetting;

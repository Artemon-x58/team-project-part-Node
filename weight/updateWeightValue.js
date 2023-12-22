const { currentDate, HttpError } = require("../helpers");
const { Weight } = require("../models");

const updateWeightValue = async (owner, weight) => {
  const today = currentDate();
  const result = await Weight.findOneAndUpdate(
    { owner, "weightAndDate.date": today },
    { $set: { "weightAndDate.$.weight": weight } },
    { new: true }
  ).exec();
  if (!result) {
    throw HttpError(404, "Weight not found");
  }
};

module.exports = updateWeightValue;

const { currentDate } = require("../helpers");
const { Weight } = require("../models");

const updateWeightValue = async (owner, weight) => {
  const today = currentDate();
  await Weight.findOneAndUpdate(
    { owner, "weightAndDate.date": today },
    { $set: { "weightAndDate.$.weight": weight } },
    { new: true }
  ).exec();
};

module.exports = updateWeightValue;

const { Weight } = require("../models");

const updateWeightValue = async (owner, weight) => {
  await Weight.findOneAndUpdate(
    { owner },
    { $set: { weight: weight } },
    { new: true }
  ).exec();
};

module.exports = updateWeightValue;

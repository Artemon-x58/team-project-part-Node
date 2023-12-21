const { HttpError } = require("../helpers");
const { Water } = require("../models");
const recommendedWater = require("./recommendedWater");

const updateWaterValue = async (owner, weight, kef) => {
  const water = recommendedWater(weight, kef);

  const result = await Water.findOneAndUpdate(
    { owner },
    { $set: { recommendedWater: water } },
    { new: true }
  );
  if (!result) {
    throw HttpError(404, "Water not found");
  }
};

module.exports = updateWaterValue;

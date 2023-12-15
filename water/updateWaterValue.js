const { Water } = require("../models");
const recommendedWater = require("./recommendedWater");

const updateWaterValue = async (owner, weight, kef) => {
  const water = recommendedWater(weight, kef);

  await Water.findOneAndUpdate(
    { owner },
    { $set: { recommendedWater: water } },
    { new: true }
  );
};

module.exports = updateWaterValue;

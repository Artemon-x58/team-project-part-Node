const recommendedWater = (weight, kef) => {
  let additionalWater = 0;

  if (kef === 1.2) {
    additionalWater = 0;
  } else if (kef === 1.375 || kef === 1.55 || kef === 1.725) {
    additionalWater = 350;
  } else if (kef === 1.9) {
    additionalWater = 700;
  }

  const result =
    Math.round((weight * 0.03 * 1000 + additionalWater) / 100) * 100;
  return result;
};

module.exports = recommendedWater;

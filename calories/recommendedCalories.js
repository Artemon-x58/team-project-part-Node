const recommendedCalories = (gender, weight, height, kef, age) => {
  if (gender === "male") {
    const result =
      Math.round(
        ((88.362 + 13.397 * weight + 4.799 * height - 5.677 * age) * kef) / 100
      ) * 100;

    return result;
  }
  const result =
    Math.round(
      ((447.593 + 9.247 * weight + 3.098 * height - 4.33 * age) * kef) / 100
    ) * 100;
  return result;
};

module.exports = recommendedCalories;

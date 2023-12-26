const sumObjectProperties = (arr) => {
  return arr.reduce(
    (acc, entry) => {
      acc.calories += entry.calories;
      acc.carbohydrates += entry.carbohydrates;
      acc.protein += entry.protein;
      acc.fat += entry.fat;
      return acc;
    },
    {
      calories: 0,
      carbohydrates: 0,
      protein: 0,
      fat: 0,
    }
  );
};

module.exports = sumObjectProperties;

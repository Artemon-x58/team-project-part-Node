const funcToFixed = (obj, nutrients) => {
  if (nutrients) {
    return {
      carbohydrates: parseFloat(obj.carbohydrates.toFixed(2)),
      protein: parseFloat(obj.protein.toFixed(2)),
      fat: parseFloat(obj.fat.toFixed(2)),
    };
  } else {
    return {
      calories: parseFloat(obj.calories.toFixed(2)),
      carbohydrates: parseFloat(obj.carbohydrates.toFixed(2)),
      protein: parseFloat(obj.protein.toFixed(2)),
      fat: parseFloat(obj.fat.toFixed(2)),
    };
  }
};

module.exports = funcToFixed;

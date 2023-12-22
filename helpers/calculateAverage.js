const calculateAverage = (arr, property) => {
  const total = arr.reduce((acc, item) => acc + item, 0);
  return arr.length > 0 ? total / arr.length : 0;
};

module.exports = calculateAverage;

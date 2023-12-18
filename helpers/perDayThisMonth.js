const getMonthFromDate = require("./getMonthFromDate");

const perDayThisMonth = (arr, month) => {
  return arr.filter((item) => {
    const monthFromMongoDB = getMonthFromDate(item.date);
    return monthFromMongoDB === month;
  });
};

module.exports = perDayThisMonth;

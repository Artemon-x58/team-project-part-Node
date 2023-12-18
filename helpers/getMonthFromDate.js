const getMonthFromDate = (dateString) => {
  const dateObject = new Date(dateString);
  const month = String(dateObject.getMonth() + 1);
  return month;
};

module.exports = getMonthFromDate;

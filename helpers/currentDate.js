const currentDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${year}.${month}.${day}`;
  return formattedDate;
};

module.exports = currentDate;

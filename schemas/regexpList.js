const validGoals = ["lose fat", "maintain", "gain muscle"];
const validMeals = ["breakfast", "dinner", "lunch", "snack"];
const validKefs = [1.2, 1.375, 1.55, 1.725, 1.9];
const monthsArray = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const nameRegexp = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

module.exports = {
  validGoals,
  validKefs,
  emailRegexp,
  nameRegexp,
  validMeals,
  monthsArray,
};

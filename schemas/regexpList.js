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
const passwordRegexp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]*$/;

const nameMessage = {
  "string.base": "Name must be a string.",
  "any.required": "Name field is required.",
  "string.empty": "Name must not be empty.",
  "string.pattern.base":
    "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
};

const emailMessage = {
  "string.base": "Email must be a string.",
  "any.required": "The Email field is required.",
  "string.empty": "Email must not be empty.",
  "string.pattern.base": "Email must be in the format test@gmail.com.",
};

const passwordMessage = {
  "string.base": "Password must be a string.",
  "any.required": "Password field is required.",
  "string.empty": "Password must not be empty.",
  "string.pattern.base":
    "The password must contain at least one uppercase letter (A-Z), at least one digit (0-9), and can consist of letters (both uppercase and lowercase) and digits.",
};

module.exports = {
  validGoals,
  validKefs,
  emailRegexp,
  nameRegexp,
  validMeals,
  monthsArray,
  passwordRegexp,
  nameMessage,
  emailMessage,
  passwordMessage,
};

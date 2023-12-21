const { HttpError } = require("../helpers");

const validateUsers = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log("lol");
      next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};
module.exports = validateUsers;

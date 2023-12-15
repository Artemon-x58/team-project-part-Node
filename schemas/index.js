const { registerAndLoginSchema, loginSchema, emailSchema, updateUserSchema } = require("./users");
const waterSchema = require("./water");
const weightSchema = require("./weight");

module.exports = {
  registerAndLoginSchema,
  emailSchema,
  waterSchema,
  loginSchema,
  weightSchema,
  updateUserSchema,
};

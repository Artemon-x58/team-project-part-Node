const { registerSchema, loginSchema, emailSchema, updateUserSchema } = require("./users");
const waterSchema = require("./water");
const weightSchema = require("./weight");

module.exports = {
  registerAndLoginSchema: registerSchema,
  emailSchema,
  waterSchema,
  loginSchema,
  weightSchema,
  updateUserSchema,
};

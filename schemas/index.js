const { registerAndLoginSchema, loginSchema, emailSchema } = require("./users");
const waterSchema = require("./water");
const weightSchema = require("./weight");

module.exports = {
  registerAndLoginSchema,
  emailSchema,
  waterSchema,
  loginSchema,
  weightSchema,
};

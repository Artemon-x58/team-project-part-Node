const { registerAndLoginSchema, loginSchema, emailSchema } = require("./users");
const waterSchema = require("./water");

module.exports = {
  registerAndLoginSchema,
  emailSchema,
  waterSchema,
  loginSchema,
};

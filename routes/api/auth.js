const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers");

const {
  authenticate,
  validateUsers,
  upload,
  validateBody,
} = require("../../middlewares");

const schemas = require("../../schemas");
const { resendVerifyEmail } = require("../../services/email");

router.post(
  "/signup",
  validateUsers(schemas.registerAndLoginSchema),
  ctrl.auth.register
);

router.post(
  "/forgot-password",
  validateBody(schemas.emailSchema),
  resendVerifyEmail
);

router.post("/signin", validateUsers(schemas.loginSchema), ctrl.auth.login);

router.get("/current", authenticate, ctrl.auth.getCurrent);

router.post("/signout", authenticate, ctrl.auth.logOut);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.auth.updateAvatar
);

module.exports = router;

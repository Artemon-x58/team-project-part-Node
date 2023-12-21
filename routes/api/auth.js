const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers");

const { authenticate, validateBody, upload } = require("../../middlewares");

const schemas = require("../../schemas");
const { resendVerifyEmail } = require("../../services/email");

router.post(
  "/signup",
  validateBody(schemas.registerAndLoginSchema),
  ctrl.auth.register
);

router.post(
  "/forgot-password",
  validateBody(schemas.emailSchema),
  resendVerifyEmail
);

router.post("/signin", validateBody(schemas.loginSchema), ctrl.auth.login);

router.get("/currentUser", authenticate, ctrl.auth.currentUser);

router.post("/signout", authenticate, ctrl.auth.logOut);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.auth.updateAvatar
);

module.exports = router;

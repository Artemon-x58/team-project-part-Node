const express = require("express");
const { authenticate, validateUsers } = require("../../middlewares");
const schemas = require("../../schemas");
const ctrl = require("../../controllers");
const router = express.Router();

router.put(
  "/update",
  authenticate,
  validateUsers(schemas.updateUserSchema),
  ctrl.users.updateUserSetting
);


router.post(
  "/water-intake",
  authenticate,
  validateUsers(schemas.waterSchema),
  ctrl.users.waterEdit
);

router.post(
  "/edit-weight",
  authenticate,
  validateUsers(schemas.weightSchema),
  ctrl.users.weightEdit
);

module.exports = router;

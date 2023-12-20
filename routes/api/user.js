const express = require("express");
const { authenticate, validateUsers } = require("../../middlewares");
const schemas = require("../../schemas");
const ctrl = require("../../controllers");
const router = express.Router();

router.get("/current", authenticate, ctrl.users.getCurrent);

router.put(
  "/update",
  authenticate,
  validateUsers(schemas.updateUserSchema),
  ctrl.users.updateUserSetting
);

router.put(
  "/goal",
  authenticate,
  validateUsers(schemas.goalSchema),
  ctrl.users.goalEdit
);

router.post(
  "/food-intake",
  authenticate,
  validateUsers(schemas.addDairySchema),
  ctrl.users.addDiary
);

router.put(
  "/food-intake/:id",
  authenticate,
  validateUsers(schemas.dairyUpdateSchema),
  ctrl.users.updateDiaryById
);

router.delete(
  "/food-intake",
  authenticate,
  validateUsers(schemas.deleteDairySchema),
  ctrl.users.deleteDiary
);

router.delete(
  "/food-intake/:id",
  authenticate,
  validateUsers(schemas.deleteDairySchema),
  ctrl.users.deleteDairyById
);

router.post(
  "/water-intake",
  authenticate,
  validateUsers(schemas.waterSchema),
  ctrl.users.waterEdit
);
router.delete("/water-intake", authenticate, ctrl.users.waterDelete);

router.get(
  "/statistics",
  authenticate,
  validateUsers(schemas.statisticsSchema),
  ctrl.users.statistics
);

router.post(
  "/edit-weight",
  authenticate,
  validateUsers(schemas.weightSchema),
  ctrl.users.weightEdit
);

module.exports = router;

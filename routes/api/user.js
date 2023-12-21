const express = require("express");
const { authenticate, validateBody } = require("../../middlewares");
const schemas = require("../../schemas");
const ctrl = require("../../controllers");
const router = express.Router();

router.get("/current", authenticate, ctrl.users.getCurrent);

router.put(
  "/update",
  authenticate,
  validateBody(schemas.updateUserSchema),
  ctrl.users.updateUserSetting
);

router.put(
  "/goal",
  authenticate,
  validateBody(schemas.goalSchema),
  ctrl.users.goalEdit
);

router.get("/food-intake", authenticate, ctrl.users.getDiary);

router.post(
  "/food-intake",
  authenticate,
  validateBody(schemas.addDairySchema),
  ctrl.users.addDiary
);

router.put(
  "/food-intake/:id",
  authenticate,
  validateBody(schemas.dairyUpdateSchema),
  ctrl.users.updateDiaryById
);

router.delete(
  "/food-intake",
  authenticate,
  validateBody(schemas.deleteDairySchema),
  ctrl.users.deleteDiary
);

router.delete(
  "/food-intake/:id",
  authenticate,
  validateBody(schemas.deleteDairySchema),
  ctrl.users.deleteDairyById
);

router.post(
  "/water-intake",
  authenticate,
  validateBody(schemas.waterSchema),
  ctrl.users.waterEdit
);
router.delete("/water-intake", authenticate, ctrl.users.waterDelete);

router.get(
  "/statistics",
  authenticate,
  validateBody(schemas.statisticsSchema),
  ctrl.users.statistics
);

router.post(
  "/weight",
  authenticate,
  validateBody(schemas.weightSchema),
  ctrl.users.weightEdit
);

module.exports = router;

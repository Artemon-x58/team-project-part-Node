const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares");
const ctrl = require("../../controllers");

router.get(
  "/recommended-food",
  authenticate,
  ctrl.recommendedFood.recommendedFood
);

module.exports = router;

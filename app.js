const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const swaggerDocument = require("./swagger.json");

const {
  authRouter,
  userRouter,
  recommendedFoodRouter,
} = require("./routes/api");

const app = express();

app.use(express.urlencoded({ extended: false }));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api", recommendedFoodRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const passport = require("../config/passport");
const checkJWT = require("../middlewares/checkJWT");
const authRouter = require("../routes/auth");
const userRouter = require("../routes/user");
const indexRouter = require("../routes/index");
const errorHandler = require("../middlewares/errorHandler");

const initiateMiddlewares = (app) => {
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    })
  );
  app.use(logger("dev"));
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: false, limit: "5mb" }));

  app.use(passport.initialize());
  app.use(checkJWT);

  app.use("/", indexRouter);
  app.use("/auth", authRouter);
  app.use("/user", userRouter);

  app.use(errorHandler);
};

module.exports = initiateMiddlewares;

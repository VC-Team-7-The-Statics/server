const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const passport = require("../config/passport");
const checkJWT = require("../middlewares/checkJWT");
const authRouter = require("../routes/auth");
const errorHandler = require("../middlewares/errorHandler");

const initiateMiddlewares = (app) => {
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    })
  );
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(passport.initialize());
  app.use(checkJWT);

  app.use("/auth", authRouter);

  app.use(errorHandler);
};

module.exports = initiateMiddlewares;

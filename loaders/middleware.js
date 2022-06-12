const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const passport = require("../config/passport");
const checkJWT = require("../middlewares/checkJWT");
const authRouter = require("../routes/auth");
const userRouter = require("../routes/user");
const indexRouter = require("../routes/index");
const chatRouter = require("../routes/chat");
const errorHandler = require("../middlewares/errorHandler");

const initiateMiddlewares = (app) => {
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "https://preeminent-licorice-96005b.netlify.app",
        "https://cosmic-semolina-b6e8c3.netlify.app",
        "https://shiny-druid-4172be.netlify.app",
      ],
      methods: ["GET", "POST"],
    })
  );
  app.use(logger("dev"));
  app.use(express.json({ limit: "5mb" }));
  app.use(express.urlencoded({ extended: false, limit: "2mb" }));

  app.use(passport.initialize());
  app.use(checkJWT);

  app.use("/", indexRouter);
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/chat", chatRouter);

  app.use(errorHandler);
};

module.exports = initiateMiddlewares;

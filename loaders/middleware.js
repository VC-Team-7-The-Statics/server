const express = require("express");
const logger = require("morgan");
const cors = require("cors");

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
};

module.exports = initiateMiddlewares;

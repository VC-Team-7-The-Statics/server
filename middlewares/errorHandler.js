/* eslint-disable no-unused-vars */
const {
  JWT_ERROR,
  UNAUTHORIZED,
  INVALID_TOKEN,
  MONGO_SERVER_ERROR,
  VALIDATION_ERROR,
  WRONG_PASSWORD,
} = require("../constants/errorConstants");

const errorHandler = (err, req, res, next) => {
  console.log("Error Name -> ", err.name);
  console.log("Error Message -> ", err.message);

  switch (err.name) {
    case JWT_ERROR:
    case UNAUTHORIZED:
    case INVALID_TOKEN:
      return res
        .status(200)
        .json({ success: false, message: "unauthorized access" });

    case MONGO_SERVER_ERROR:
      return res
        .status(200)
        .json({ success: false, message: "Could not save data" });

    case VALIDATION_ERROR:
    case WRONG_PASSWORD:
      return res
        .status(200)
        .json({ success: false, message: "validation error" });
  }

  res.status(500).json({ success: false, message: "server error" });
};

module.exports = errorHandler;

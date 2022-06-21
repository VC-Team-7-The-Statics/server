const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/secrets");
const { UNAUTHORIZED } = require("../constants/errorConstants");
const ErrorResponse = require("../utils/ErrorResponse");

const protect = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, JWT_SECRET);

    return next();
  }

  next(new ErrorResponse(UNAUTHORIZED));
};

module.exports = protect;

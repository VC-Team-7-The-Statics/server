const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const generateJWT = async (email) => {
  const token = await jwt.sign({ email }, secrets.JWT_SECRET);

  return token;
};

module.exports = generateJWT;

require("dotenv").config();

module.exports = {
  MONGO_DB_CONNECTION_URI: process.env.MONGO_DB_CONNECTION_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

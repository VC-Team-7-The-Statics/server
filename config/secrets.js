require("dotenv").config();

module.exports = {
  MONGO_DB_CONNECTION_URI: process.env.MONGO_DB_CONNECTION_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID,
  AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
};

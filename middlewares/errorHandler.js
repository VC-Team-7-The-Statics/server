/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  console.log("Error Name -> ", err.name);
  console.log("Error Message -> ", err.message);
  switch (err.name) {
    case "unauthorized":
      return res.status(200).json({ success: false, message: err.name });

    case "MongoServerError":
      return res
        .status(200)
        .json({ success: false, message: "Could not save data" });

    case "validation error":
    case "wrong password":
      return res
        .status(200)
        .json({ success: false, message: "validation error" });
  }

  res.status(500).json({ success: false, message: "server error" });
};

module.exports = errorHandler;

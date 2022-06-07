/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "unauthorized":
      return res.status(200).json({ success: false, message: err.name });

    case "MongoServerError":
      return res
        .status(200)
        .json({ success: false, message: "Could not save data" });
  }

  res.status(500).json({ success: false, message: "server error" });
};

module.exports = errorHandler;
/* eslint-disable no-unused-vars */
const User = require("../models/User");
const asyncCatcher = require("../utils/asyncCatcher");

exports.recommendUser = asyncCatcher(async (req, res, next) => {
  const { email, location } = req.user;
  const [longitude, latitude] = location.coordinates;

  const page = parseInt(req.query.p) || 0;
  const usersPerRequest = 1;

  const query = {
    $and: [
      { email: { $ne: email } },
      {
        location: {
          $geoWithin: {
            $centerSphere: [[longitude, latitude], 1 / 6378.1],
          },
        },
      },
    ],
  };

  const users = await User.find(query)
    .skip(usersPerRequest * page)
    .limit(usersPerRequest)
    .select("name email company languages expertise image")
    .lean();

  const totalMatchingUsers = await User.countDocuments(query);

  const isLastPage = page + 1 === totalMatchingUsers;

  res.json({ success: true, recommendation: users, page, isLastPage });
});

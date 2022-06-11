/* eslint-disable no-unused-vars */
const Match = require("../models/Match");
const User = require("../models/User");
const UserService = require("../services/UserService");
const MatchService = require("../services/MatchService");
const asyncCatcher = require("../utils/asyncCatcher");

const UserInstance = new UserService(User);
const MatchInstance = new MatchService(Match);

exports.recommendUser = asyncCatcher(async (req, res, next) => {
  const { email, location, likes } = req.user;
  const [longitude, latitude] = location.coordinates;

  const page = parseInt(req.query.p) || 0;
  const usersPerRequest = 1;

  const query = {
    $and: [
      { email: { $ne: email } },
      { _id: { $nin: likes } },
      {
        location: {
          $geoWithin: {
            $centerSphere: [[longitude, latitude], 1 / 6378.1],
          },
        },
      },
    ],
  };

  const { users, totalMatchingUsers } =
    await UserInstance.RecommendMatchingUsers(query, usersPerRequest, page);

  const isLastPage = page + 1 === totalMatchingUsers;

  res.json({ success: true, recommendation: users, page, isLastPage });
});

exports.getCoffeePrice = asyncCatcher(async (req, res, next) => {
  const { userId } = req.params;

  const { price, name } = await UserInstance.FindUser({ _id: userId });

  res.json({ success: true, price, name });
});

exports.likeUser = asyncCatcher(async (req, res, next) => {
  const { from: myId, to: yourId } = req.body;

  const you = await UserInstance.AddUserInMyLikesField(myId, yourId);

  const yourLikes = you.likes.map((id) => id.toString());

  if (yourLikes.includes(myId)) {
    const match = await MatchInstance.CreateMatch(myId, yourId);

    await UserInstance.AddMatchToBothUsers(myId, yourId, match._id);
  }

  res.json({ success: true });
});

exports.getProfileInfo = asyncCatcher(async (req, res, next) => {
  const { email } = req.user;

  const populatedProfile = await UserInstance.GetPopulatedProfile({ email });

  res.json({ success: true, profile: populatedProfile });
});

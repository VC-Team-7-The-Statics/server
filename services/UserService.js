class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  FindUser = async (query) => await this.userModel.findOne(query).lean();

  FindUserWithPassword = async (query) =>
    await this.userModel.findOne(query).select("+password");

  ValidatePassword = async (password) =>
    await this.userModel.matchPassword(password);

  RegisterUser = async (query) => await this.userModel.create(query);

  AddUserInMyLikesField = async (myId, yourId) => {
    await this.userModel.findByIdAndUpdate(myId, {
      $addToSet: { likes: yourId },
    });

    const you = await this.userModel.findById(yourId).select("likes").lean();

    return you;
  };

  AddMatchToBothUsers = async (myId, yourId, matchId) => {
    await this.userModel.updateMany(
      { _id: { $in: [myId, yourId] } },
      { $addToSet: { match: matchId } }
    );
  };

  RecommendMatchingUsers = async (query, usersPerRequest, pageNum) => {
    const users = await this.userModel
      .find(query)
      .skip(usersPerRequest * pageNum)
      .limit(usersPerRequest)
      .select("name email company languages expertise image")
      .lean();

    const totalMatchingUsers = await this.userModel.countDocuments(query);

    return { users, totalMatchingUsers };
  };

  AddCoffeeRequestToReceiver = async (receiverId, coffeeFormId) => {
    await this.userModel.findByIdAndUpdate(receiverId, {
      $addToSet: { incomingCoffeeRequest: coffeeFormId },
    });
  };

  GetPopulatedProfile = async (query) => {
    const populatedProfile = await this.userModel
      .findOne(query)
      .populate({
        path: "match",
        populate: { path: "couple", select: "name image" },
      })
      .populate({
        path: "incomingCoffeeRequest",
        populate: { path: "from", select: "name company" },
        select: "title content accepted",
      })
      .populate({
        path: "likes",
        select: "name image",
      })
      .select("likes match incomingRequest");

    return populatedProfile;
  };
}

module.exports = UserService;

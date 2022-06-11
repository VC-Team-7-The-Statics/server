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
}

module.exports = UserService;

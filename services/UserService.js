class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async FindUser(query) {
    return await this.userModel.findOne(query).lean();
  }
}

module.exports = UserService;

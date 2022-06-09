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
}

module.exports = UserService;

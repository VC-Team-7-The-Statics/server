const asyncCatcher = require("../utils/asyncCatcher");
const generateJWT = require("../utils/generateJWT");
const ErrorResponse = require("../utils/ErrorResponse");
const UserService = require("../services/UserService");
const User = require("../models.js/User");

const UserInstance = new UserService(User);

exports.logIn = asyncCatcher(async (req, res, next) => {
  const isLoginWithBody = Object.keys(req.body).includes("email");

  if (isLoginWithBody) {
    // 회원 가입 로직 제작 후 비밀번호 확인 및 암호화 로직 작성해야 합니다.
    const { email } = req.body;

    const user = await UserInstance.FindUser({ email });

    if (!user) return next(new ErrorResponse("unauthorized"));

    const token = await generateJWT(user.email);

    return res.json({ success: true, token, user });
  }

  if (!req.user) {
    return next(new ErrorResponse("unauthorized"));
  }

  const token = await generateJWT(req.user.email);

  return res.json({ success: true, token, user: req.user });
});

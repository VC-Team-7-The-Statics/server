/* eslint-disable no-unused-vars */
const AWS = require("aws-sdk");
const asyncCatcher = require("../utils/asyncCatcher");
const generateJWT = require("../utils/generateJWT");
const ErrorResponse = require("../utils/ErrorResponse");
const UserService = require("../services/UserService");
const User = require("../models/User");
const secrets = require("../config/secrets");

const UserInstance = new UserService(User);

const s3 = new AWS.S3({
  accessKeyId: secrets.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: secrets.AWS_S3_SECRET_ACCESS_KEY,
});

exports.logIn = asyncCatcher(async (req, res, next) => {
  const isLoginWithBody = Object.keys(req.body).includes("email");

  if (isLoginWithBody) {
    const { email, password } = req.body;

    const user = await UserInstance.FindUserWithPassword({ email });

    if (!user) return next(new ErrorResponse("unauthorized"));

    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) return next(new ErrorResponse("wrong password"));

    const token = await generateJWT(user.email);

    return res.json({ success: true, token, user });
  }

  if (!req.user) {
    return next(new ErrorResponse("invalid token"));
  }

  const token = await generateJWT(req.user.email);

  // FIX ME: 진욱 작업 - 좋아요한 유저 이미지를 추출하기 위해 작성한 코드입니다. 현재 조회할 유저 id를 임의로 작성한 상태라 해당 코드 변경이 필요합니다.ㅈㅂ
  const resultOnDemand = await User.find({
    _id: { $in: ["62a13f789b2ff58829c6b587", "62a14f589b2ff58829c6b5ae"] },
  }).select("image");

  return res.json({ success: true, token, user: req.user });
});

exports.signup = asyncCatcher(async (req, res, next) => {
  const {
    name,
    email,
    password,
    company,
    languages,
    expertise,
    price,
    base64,
    location,
  } = req.body;

  const imageBuffer = Buffer.from(base64, "base64");

  const { Location: S3_Location } = await s3
    .upload({
      Bucket: secrets.AWS_S3_BUCKET_NAME,
      // Key 값은 테스팅이 끝나면 유저의 이메일로 변경해야 합니다.
      Key: `${Date.now()}.jpg`,
      Body: imageBuffer,
      ContentType: "image/jpeg",
    })
    .promise();

  const formattedLanguages = Object.entries(languages).map((entry) => ({
    name: entry[0],
    stacks: entry[1],
  }));

  const userCredential = {
    name,
    email,
    password,
    company,
    languages: formattedLanguages,
    expertise,
    price,
    location: {
      type: "Point",
      coordinates: [location.longitude, location.latitude],
    },
    image: S3_Location,
  };

  const registeredUser = await UserInstance.RegisterUser(userCredential);
  const token = await generateJWT(email);

  res.json({ success: true, token, user: registeredUser });
});

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
      Key: `${email}.jpg`,
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

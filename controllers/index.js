/* eslint-disable no-unused-vars */
const asyncCatcher = require("../utils/asyncCatcher");
const CoffeeForm = require("../models/CoffeeForm");
const Language = require("../models/Language");
const User = require("../models/User");
const CoffeeFormService = require("../services/CoffeeFormService");
const LanguageService = require("../services/LanguageService");
const UserService = require("../services/UserService");

const CoffeeFormInstance = new CoffeeFormService(CoffeeForm);
const LanguageInstance = new LanguageService(Language);
const UserInstance = new UserService(User);

exports.submitCoffeeRequest = asyncCatcher(async (req, res, next) => {
  const coffeeForm = {
    from: req.body.from,
    to: req.body.to,
    title: req.body.title,
    content: req.body.content,
  };

  const coffeeRequest = await CoffeeFormInstance.RegisterCoffeeForm(coffeeForm);

  await UserInstance.AddCoffeeRequestToReceiver(
    coffeeForm.to,
    coffeeRequest._id
  );

  res.json({ success: true });
});

exports.getLanguages = asyncCatcher(async (req, res, next) => {
  const languages = await LanguageInstance.GetLanguages();

  res.json({ success: true, languages });
});

/* eslint-disable no-unused-vars */
const CoffeeForm = require("../models/CoffeeForm");
const asyncCatcher = require("../utils/asyncCatcher");
const CoffeeFormService = require("../services/CoffeeFormService");
const CoffeeFormInstance = new CoffeeFormService(CoffeeForm);

exports.submit = asyncCatcher(async (req, res, next) => {
  const coffeeForm = {
    from: "62a1cb520f4d52f56ec0aca3",
    to: "62a13f789b2ff58829c6b587",
    title: req.body.title,
    content: req.body.content,
    accepted: false,
  };

  await CoffeeFormInstance.RegisterCoffeeForm(coffeeForm);

  res.json({ success: true });
});

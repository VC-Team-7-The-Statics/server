const CoffeeForm = require("../models/CoffeeForm");
const asyncCatcher = require("../utils/asyncCatcher");
const CoffeeFormService = require("../services/CoffeeFormService");
// eslint-disable-next-line no-unused-vars

const CoffeeFormInstance = new CoffeeFormService(CoffeeForm);
// eslint-disable-next-line no-unused-vars
exports.submit = asyncCatcher(async (req, res, next) => {
  const coffeeForm = {
    from: "62a1cb520f4d52f56ec0aca3",
    to: "62a13f789b2ff58829c6b587",
    title: req.body.title,
    content: req.body.content,
    accepted: false,
  };

  try {
    CoffeeFormInstance.RegisterCoffeeForm(coffeeForm);
  } catch (err) {
    console.log("err", err);
  }

  res.json({ success: true });
});

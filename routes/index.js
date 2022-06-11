const { submitCoffeeRequest, getLanguages } = require("../controllers/index");

const router = require("express")();

router.route("/coffee-form").post(submitCoffeeRequest);

router.route("/languages").get(getLanguages);

module.exports = router;

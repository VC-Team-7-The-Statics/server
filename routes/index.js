const { submitCoffeeRequest, getLanguages } = require("../controllers/index");
const protect = require("../middlewares/protect");

const router = require("express")();

router.route("/coffee-form").post(protect, submitCoffeeRequest);

router.route("/languages").get(protect, getLanguages);

module.exports = router;

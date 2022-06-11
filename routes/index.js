const { submit, getLanguages } = require("../controllers/index");

const router = require("express")();

router.route("/coffee-form").post(submit);

router.route("/languages").get(getLanguages);

module.exports = router;

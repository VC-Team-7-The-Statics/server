const { submit } = require("../controllers/index");

const router = require("express")();

router.route("/coffee-form").post(submit);

module.exports = router;

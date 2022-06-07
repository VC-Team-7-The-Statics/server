const { logIn } = require("../controllers/auth");

const router = require("express")();

router.route("/login").post(logIn);

module.exports = router;

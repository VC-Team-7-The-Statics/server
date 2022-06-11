const { logIn, signup } = require("../controllers/auth");
const { validate, registrationSchema } = require("../middlewares/validation");

const router = require("express")();

router.route("/login").post(logIn);

router.route("/signup").post(validate(registrationSchema), signup);

module.exports = router;

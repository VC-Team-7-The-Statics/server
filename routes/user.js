const { recommendUser } = require("../controllers/user");

const router = require("express")();

// router.route("/like").post();
router.route("/:userId/recommend").get(recommendUser);

module.exports = router;

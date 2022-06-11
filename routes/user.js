const {
  recommendUser,
  getCoffeePrice,
  likeUser,
  getProfileInfo,
} = require("../controllers/user");
const protect = require("../middlewares/protect");

const router = require("express")();

router.route("/like").post(protect, likeUser);

router.route("/profile").get(protect, getProfileInfo);

router.route("/:userId/recommend").get(protect, recommendUser);

router.route("/:userId/price").get(protect, getCoffeePrice);

module.exports = router;

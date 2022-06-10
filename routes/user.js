const {
  recommendUser,
  getCoffeePrice,
  likeUser,
} = require("../controllers/user");

const router = require("express")();

router.route("/like").post(likeUser);

router.route("/:userId/recommend").get(recommendUser);

router.route("/:userId/price").get(getCoffeePrice);

module.exports = router;

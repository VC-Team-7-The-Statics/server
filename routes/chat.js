const { createChatroom } = require("../controllers/chats");

const router = require("express")();

router.route("/create").post(createChatroom);

module.exports = router;

const { createChatroom, getAllChatRooms } = require("../controllers/chats");

const router = require("express")();

router.route("/create").post(createChatroom);

router.route("/list").get(getAllChatRooms);

module.exports = router;

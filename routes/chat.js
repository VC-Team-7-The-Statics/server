const {
  createChatroom,
  getAllChatRooms,
  visitChatRoom,
} = require("../controllers/chats");
const protect = require("../middlewares/protect");

const router = require("express")();

router.route("/create").post(protect, createChatroom);

router.route("/list").get(protect, getAllChatRooms);

router.route("/:userId/:roomId").get(protect, visitChatRoom);

module.exports = router;

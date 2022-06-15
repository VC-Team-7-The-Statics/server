const { default: mongoose } = require("mongoose");

const ChatSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "채팅 작성자를 알 수 없습니다."],
    ref: "User",
  },
  text: String,
  createdAt: Number,
});

const ChatRoomSchema = new mongoose.Schema({
  attendants: {
    type: [mongoose.Schema.Types.ObjectId],
    required: [true, "참가자는 두 명이어야 합니다."],
    ref: "User",
  },
  chats: [ChatSchema],
});

module.exports = mongoose.model("ChatRoom", ChatRoomSchema);

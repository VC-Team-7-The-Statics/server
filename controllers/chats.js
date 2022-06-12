/* eslint-disable no-unused-vars */
const { default: mongoose } = require("mongoose");
const ChatRoom = require("../models/ChatRoom");
const User = require("../models/User");
const ChatRoomService = require("../services/ChatRoomService");
const UserService = require("../services/UserService");
const asyncCatcher = require("../utils/asyncCatcher");
const duplicateChatroomChecker = require("../utils/duplicateChatroomChecker");

const UserInstance = new UserService(User);
const ChatRoomInstance = new ChatRoomService(ChatRoom);

exports.createChatroom = asyncCatcher(async (req, res, next) => {
  const { attendants } = req.body;
  const attendant = mongoose.Types.ObjectId(attendants[1]);

  const populatedChatRooms = await User.findById(attendants[0])
    .populate({
      path: "chatroom",
      select: "attendants",
    })
    .select("chatroom");

  const isDuplicateChatRoom = duplicateChatroomChecker(
    populatedChatRooms.chatroom,
    attendant
  );

  if (isDuplicateChatRoom) {
    return res.json({
      success: false,
      message: "같은 사람과 중복된 채팅방을 생성할 수 없습니다.",
    });
  }

  const chatRoom = await ChatRoomInstance.CreateChatRoom(attendants);

  await UserInstance.AddChatRoomIdToAttendants(attendants, chatRoom._id);

  res.json({ success: true, roomId: chatRoom._id });
});

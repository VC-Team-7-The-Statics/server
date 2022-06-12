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
  const attendant = attendants[0];
  const otherAttendant = mongoose.Types.ObjectId(attendants[1]);

  const populatedChatRooms = await UserInstance.GetAllChatRoomsOfUser({
    _id: attendant,
  });

  const chatRoomAlreadyExists = duplicateChatroomChecker(
    populatedChatRooms.chatroom,
    otherAttendant
  );

  if (chatRoomAlreadyExists) {
    return res.json({
      success: false,
      message: "같은 사람과 중복된 채팅방을 생성할 수 없습니다.",
    });
  }

  const chatRoom = await ChatRoomInstance.CreateChatRoom(attendants);

  await UserInstance.AddChatRoomIdToAttendants(attendants, chatRoom._id);

  res.json({ success: true, roomId: chatRoom._id });
});

exports.getAllChatRooms = asyncCatcher(async (req, res, next) => {
  const { _id: userId, name, image } = req.user;

  const { chatroom } = await UserInstance.GetAllChatRoomListOfUser(userId);

  const filteredChatrooms = chatroom.map(
    ({ attendants }) =>
      attendants.filter((user) => user._id.toString() !== userId.toString())[0]
  );

  res.json({
    success: true,
    chatrooms: filteredChatrooms,
    name,
    image,
    id: userId,
  });
});

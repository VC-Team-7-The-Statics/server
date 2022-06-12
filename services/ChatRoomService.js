class ChatRoomService {
  constructor(chatRoomModel) {
    this.chatRoomModel = chatRoomModel;
  }

  CreateChatRoom = async (attendants) =>
    await this.chatRoomModel.create({
      attendants,
    });

  GetChatHistory = async (roomId) =>
    await this.chatRoomModel.findById(roomId).select("chats");
}

module.exports = ChatRoomService;

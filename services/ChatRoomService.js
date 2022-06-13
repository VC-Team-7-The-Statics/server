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

  SaveChats = async (roomId, chat) => {
    await this.chatRoomModel.updateOne(
      { _id: roomId },
      { $push: { chats: chat } }
    );
  };
}

module.exports = ChatRoomService;

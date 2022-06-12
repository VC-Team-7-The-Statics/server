class ChatRoomService {
  constructor(chatRoomModel) {
    this.chatRoomModel = chatRoomModel;
  }

  CreateChatRoom = async (attendants) => {
    return await this.chatRoomModel.create({
      attendants,
    });
  };
}

module.exports = ChatRoomService;

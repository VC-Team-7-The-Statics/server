class ChatRoomService {
  constructor(chatRoomModel, redisClient) {
    this.chatRoomModel = chatRoomModel;
    this.redisClient = redisClient;
  }

  CreateChatRoom = async (attendants) =>
    await this.chatRoomModel.create({
      attendants,
    });

  GetChatHistory = async (roomId) =>
    await this.chatRoomModel.findById(roomId).select("chats").lean();

  MigrateChatsFromRedisToMongoDB = async (roomId) => {
    const chats = await this.redisClient.lrange(roomId, 0, -1);

    const parsedChats = chats.map(JSON.parse);

    await this.chatRoomModel.updateMany(
      { _id: roomId },
      { $push: { chats: parsedChats } }
    );

    await this.redisClient.del(roomId);
  };

  SaveChatInRedis = async (roomId, chat) => {
    await this.redisClient.rpush(roomId, JSON.stringify(chat));
  };

  GetAttendants = async (roomId) =>
    await this.chatRoomModel
      .findById(roomId)
      .populate({ path: "attendants", select: "name" })
      .select("attendants");
}

module.exports = ChatRoomService;

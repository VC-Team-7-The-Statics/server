const { Server } = require("socket.io");
const ChatRoom = require("../models/ChatRoom");
const ChatRoomService = require("../services/ChatRoomService");
const redis = require("../config/redis");

const ChatRoomInstance = new ChatRoomService(ChatRoom, redis);

const initiateSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", async (roomId) => {
      socket.join(roomId);

      const { chats } = await ChatRoomInstance.GetChatHistory(roomId).catch(
        () => {
          io.to(roomId).emit("error", "채팅 기록을 불러오지 못했습니다.");
        }
      );

      io.to(roomId).emit("joinedRoom", chats);

      socket.on("chat", handleChat(socket, roomId));

      socket.on("disconnect", handleDisconnection(io, roomId));
    });
  });
};

const handleChat = (socket, roomId) => async (chat) => {
  await ChatRoomInstance.SaveChatInRedis(roomId, chat);

  socket.broadcast.to(roomId).emit("chat-broadcast", chat);
};

const handleDisconnection = (io, roomId) => async () => {
  await ChatRoomInstance.MigrateChatsFromRedisToMongoDB(roomId).catch(() => {
    io.to(roomId).emit("error", "채팅을 저장하지 못했습니다.");
  });
};

module.exports = initiateSocketIO;

const { Server } = require("socket.io");
const ChatRoom = require("../models/ChatRoom");
const ChatRoomService = require("../services/ChatRoomService");

const ChatRoomInstance = new ChatRoomService(ChatRoom);

const initiateSocketIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
      ],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinRoom", async (roomId) => {
      const { chats } = await ChatRoomInstance.GetChatHistory(roomId).catch(
        () => {
          socket.to(roomId).emit("error", "채팅 기록을 불러오지 못했습니다.");
        }
      );
      socket.join(roomId);

      socket.to(roomId).emit("joinedRoom", chats);

      socket.on("chat", async (chat) => {
        await ChatRoomInstance.SaveChats(roomId, chat).catch(() => {
          socket.to(roomId).emit("error", "채팅을 저장하지 못했습니다.");
        });

        socket.broadcast.to(roomId).emit("chat-broadcast", chat);
      });
    });
  });
};

module.exports = initiateSocketIO;

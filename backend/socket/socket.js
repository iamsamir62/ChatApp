import { Server } from "socket.io";

// Define userSocketMap 
const userSocketMap = {};
let io;

// Function to get the receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId] || null;
};

export const setupSocketIO = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected to socket:", socket.id);

    // Extract userId from query params
    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    console.log("User Socket Map:", userSocketMap);

    // Emit the list of online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Listen for user disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // Remove user from the map when they disconnect
      if (userId) {
        delete userSocketMap[userId];
      }

      // Emit updated list of online users
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

export { io }; 

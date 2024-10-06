import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {

    socket.on("joinRoom", ({ userId, friendId }) => {
      const roomId = [userId, friendId].sort().join("_");

      socket.join(roomId);
      console.log(`${userId} joined room: ${roomId}`);

      socket.to(roomId).emit("roomMessage", `${userId} has joined the chat`);

      socket.on("sendMessage", (message: string) => {
        console.log(`Message from ${userId} to room ${roomId}: ${message}`);
        io.to(roomId).emit("receiveMessage", { userId, message });
      });

      socket.on("disconnect", () => {
        console.log(`${userId} disconnected from room: ${roomId}`);
        socket.leave(roomId);
      });
    });
    
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

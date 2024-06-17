import { Server, Socket } from "socket.io";
import { authenticateWebSocket } from "../middleware/authenticateWebSocket";

export default function chatSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    io.use(authenticateWebSocket);

    socket.on("joinRoom", (room) => {
      socket.join(room);
    });

    socket.on("disconnect", () => {});

    socket.on("message", (message: string) => {
      io.emit("message", message);
    });

    socket.on("sendMessage", ({ room, message }) => {
      io.to(room).emit("receiveMessage", message);
    });
  });
}

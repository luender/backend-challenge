import http from "http";
import { Server } from "socket.io";
import app from "./app";
import chatSocket from "./socket/chatSocket";

const server = http.createServer(app);
export const io = new Server(server);

chatSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

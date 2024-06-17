import { ChatMessageRepository } from "../repository/chatMessage";
import { io } from "../server";

export class ChatMessageService {
  private chatMessageRepository: ChatMessageRepository;

  constructor() {
    this.chatMessageRepository = new ChatMessageRepository();
  }

  async sendMessage(data: any) {
    const { user, message, room } = data;

    if (room) {
      io.emit("receiveMessage", { room, message });
    }

    io.emit("message", message);

    await this.chatMessageRepository.saveMessage({
      user,
      message,
      room,
    });
  }
}

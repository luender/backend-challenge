import { ChatMessageRepository } from "../repository/chatMessage";
import { io } from "../server";
import { Message } from "../types/message";

export class ChatMessageService {
  private chatMessageRepository: ChatMessageRepository;

  constructor(chatMessageRepository: ChatMessageRepository) {
    this.chatMessageRepository = chatMessageRepository;
  }

  async sendMessage(data: Message) {
    const { user, message, room } = data;

    if (room) {
      io.emit("sendMessage", { room, message });
      return;
    }

    io.emit("message", message);

    await this.chatMessageRepository.saveMessage({
      user,
      message,
      room,
    });
  }
}

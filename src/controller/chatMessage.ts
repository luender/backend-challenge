import httpStatus from "http-status-codes";

import { NextFunction, Request, Response } from "express";
import { ChatMessageService } from "../service/chatMessage";

export class ChatMessageController {
  private chatMessageService: ChatMessageService;

  constructor(chatMessageService: ChatMessageService) {
    this.chatMessageService = chatMessageService;
  }

  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      await this.chatMessageService.sendMessage(data);
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

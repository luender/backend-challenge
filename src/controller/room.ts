import httpStatus from "http-status-codes";

import { NextFunction, Request, Response } from "express";
import { RoomService } from "../service/room";

export class RoomController {
  private roomService: RoomService;

  constructor(roomService: RoomService) {
    this.roomService = roomService;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const room = await this.roomService.create(data);

      return res.status(httpStatus.CREATED).send(`Your room ${room} created`);
    } catch (error) {
      return next(error);
    }
  }
}

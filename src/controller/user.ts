import httpStatus from "http-status-codes";

import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      await this.userService.register(data);
      return res.sendStatus(httpStatus.NO_CONTENT);
    } catch (error) {
      return next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;

      const token = await this.userService.login(data);

      return res.status(httpStatus.OK).json({ authToken: token });
    } catch (error) {
      return next();
    }
  }
}

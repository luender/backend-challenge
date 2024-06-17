import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(403).json({ msg: "Token is missing" });
  }

  const [, token] = authToken.split(" ");

  if (!token) {
    return res.status(403).json({ msg: "Token format is invalid" });
  }

  const secretKey = process.env.SECRET_KEY as string;

  try {
    verify(token, secretKey);

    return next();
  } catch (error) {
    return res.status(401).json({ msg: "Token is invalid" });
  }
}

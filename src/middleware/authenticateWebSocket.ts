import { verify } from "jsonwebtoken";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export function authenticateWebSocket(
  socket: Socket,
  next: (err?: ExtendedError) => void
) {
  const authToken = socket.handshake.auth.token;

  if (!authToken) {
    return next(new Error("Token is missing"));
  }

  const secretKey = process.env.SECRET_KEY as string;

  try {
    verify(authToken, secretKey);

    return next();
  } catch (error) {
    return next(new Error("Token is invalid"));
  }
}

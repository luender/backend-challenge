import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes/routes";
import { ErrorHandler, handleError } from "./utils/errorHandler";

dotenv.config();

const app = express();

app.use(express.json());
app.use(router);
app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    handleError(err, req, res, next);
  }
);

export default app;

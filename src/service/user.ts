import bcrypt from "bcryptjs";

import { UserRepository } from "../repository/user";
import { sign } from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandler";
import { User } from "../types/user";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async register(data: User) {
    try {
      const { user, email, password, confirmPassword } = data;

      const userAlreadyExists = await this.userRepository.getUser({ user });

      if (userAlreadyExists) {
        throw new ErrorHandler(400, "User exists, try again");
      }

      const comparePassword = password === confirmPassword;

      if (!comparePassword) {
        throw new ErrorHandler(400, "Password is not equal");
      }

      const newUser = {
        user,
        email,
        password: await bcrypt.hash(password, 8),
      };

      await this.userRepository.register(newUser);

      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async login(data: Partial<User>): Promise<string> {
    try {
      const { user, password } = data;

      const userAlreadyExists = await this.userRepository.getUser({ user });

      if (!userAlreadyExists) {
        throw new ErrorHandler(400, "User not exists, try again");
      }

      const passwordMatch = await bcrypt.compare(
        password as string,
        userAlreadyExists.password
      );

      if (!passwordMatch) {
        throw new ErrorHandler(400, "Password is not equal");
      }

      const secrectKey = process.env.SECRET_KEY as string;

      const token = sign({}, secrectKey, {
        subject: user,
        expiresIn: "300s",
      });

      return token;
    } catch (error) {
      throw error;
    }
  }
}

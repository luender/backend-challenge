import { RoomRepository } from "../repository/room";
import { UserRepository } from "../repository/user";
import { Room } from "../types/room";
import { ErrorHandler } from "../utils/errorHandler";

export class RoomService {
  private roomRepository: RoomRepository;
  private userRepository: UserRepository;

  constructor(roomRepository: RoomRepository, userRepository: UserRepository) {
    this.roomRepository = roomRepository;
    this.userRepository = userRepository;
  }

  async create(data: Room) {
    try {
      const { user, room } = data;

      const roomAlreadyExists = await this.roomRepository.getRoom({ room });

      if (roomAlreadyExists) {
        throw new ErrorHandler(400, "Room exists, try again");
      }

      const userAlreadyExists = await this.userRepository.getUser({ user });

      if (!userAlreadyExists) {
        throw new ErrorHandler(400, "User not exists, try again");
      }

      await this.roomRepository.create({ user, room });

      return room;
    } catch (error) {
      throw error;
    }
  }
}

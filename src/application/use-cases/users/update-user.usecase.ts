import { UpdateUserDto } from "../../dtos/users/update-user.dto";
import { User } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";

interface UpdateUserCase {
  execute: (updateUserDto: UpdateUserDto, userId: string) => Promise<User>;
}

export class UpdateUserUseCase implements UpdateUserCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async execute(updateUserDto: UpdateUserDto, userId: string): Promise<User> {
    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) {
      throw new Error("Usuario no encontrado");
    }

    const updatedUser = User.updateFromClient(existingUser, updateUserDto);


    return await this.userRepository.update(userId, updatedUser);
  }
}
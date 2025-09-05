import { User } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";

interface FindUserByIdCase {
    exec: (userID: number) => Promise<User | null>
}

export class FindUserByIdUseCase implements FindUserByIdCase {
    constructor(private readonly userRepository: UserRepository) {}

    async exec(userID: number): Promise<User | null> {
        return await this.userRepository.findById(userID);
    }
}
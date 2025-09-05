import { User } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";

interface LoggedUserCase {
    exec: (email: string) => Promise<User | null>
}

export class LoggedUserUseCase implements LoggedUserCase {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    async exec(email: string): Promise<User | null> {

        // Buscar usuario por email
        const existingUserByEmail = await this.userRepository.findByEmail(email);
        if (!existingUserByEmail) {
            throw new Error("Usuarino no encontrado")
        }
        return existingUserByEmail;
    }

}
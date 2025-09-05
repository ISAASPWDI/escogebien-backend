
import { IdGenerator } from "../../../domain/adapters/IdGenerator";
import { CreateUserDto } from "../../dtos/users/create-user.dto";
import { User } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";



interface CreateUserCase {
  execute: (createUserDto: CreateUserDto) => Promise<User>;
}

export class CreateUserUseCase implements CreateUserCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly idGenerator: IdGenerator
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    const { email, firstName, lastName, image, phone, authProvider, authProviderId } = createUserDto;

    // 1️⃣ Buscar usuario por proveedor
    const existingUserByProvider = await this.userRepository.findByAuthProvider(
      authProvider,
      authProviderId
    );
    if (existingUserByProvider) {
      return existingUserByProvider;
    }

    // 2️⃣ Buscar usuario por email
    const existingUserByEmail = await this.userRepository.findByEmail(email);
    if (existingUserByEmail) {
      return existingUserByEmail;
    }

    // 3️⃣ Crear nuevo usuario
    const user = User.createFromGoogle(
      email,
      firstName,
      lastName,
      image ?? "",
      authProviderId,
      this.idGenerator,
      phone
    );

    return await this.userRepository.create(user);
  }
}

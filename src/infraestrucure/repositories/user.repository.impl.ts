// infrastructure/repositories/user.repository.impl.ts
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserDataSourceImpl } from "../datasources/user.datasource";

export class UserRepositoryImpl implements UserRepository {
  constructor(
    private readonly userDataSource: UserDataSourceImpl
  ) {}

  async create(user: User): Promise<User> {
    return this.userDataSource.create(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userDataSource.findByEmail(email);
  }

  async findByAuthProvider(provider: string, providerId: string): Promise<User | null> {
    return this.userDataSource.findByAuthProvider(provider, providerId);
  }

  async findById(id: number): Promise<User | null> {
    return this.userDataSource.findById(id);
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    return this.userDataSource.update(id, updateData);
  }

  async delete(id: string): Promise<void> {
    return this.userDataSource.delete(id);
  }
}

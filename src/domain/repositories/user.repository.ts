import type { User } from "../entities/user.entity.ts";


export abstract class UserRepository {
  abstract create(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findByAuthProvider(provider: string, providerId: string): Promise<User | null>;
  abstract findById(id: number): Promise<User | null>;
  abstract update(id: string, updateData: Partial<User>): Promise<User>;
  abstract delete(id: string): Promise<void>;
}
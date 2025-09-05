// domain/user/User.ts

import type { IdGenerator } from "../adapters/IdGenerator.ts";
import { UpdateUserDto } from "../../application/dtos/users/update-user.dto.js";
import { FavouritePrograms } from "./favourite-program.entity.js";


type UserRolOptions = "user" | "admin";
export type AuthProviderOptions = "google" | "linkedin";

export class User {
  private constructor(
    public readonly id: string, // este será el uuid
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly image: string,
    public readonly phone: number | undefined,
    public readonly authProvider: AuthProviderOptions,
    public readonly authProviderId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly rol: UserRolOptions = "user",
    public readonly isActive: boolean = true,
    public readonly favouritePrograms?: FavouritePrograms
  ) {}

  static createFromGoogle(
    email: string,
    firstName: string,
    lastName: string,
    image: string,
    authProviderId: string,
    idGenerator: IdGenerator,
    phone?: number
  ): User {
    const now = new Date();
    return new User(
      idGenerator.generate(), // 🔹 esto se guardará en uuid
      email,
      firstName,
      lastName,
      image,
      phone,
      "google",
      authProviderId,
      now,
      now
    );
  }
  static updateFromClient(existingUser: User, updateOptions: Partial<UpdateUserDto>): User {
    return new User(
        existingUser.id,
        existingUser.email,
        updateOptions.firstName ?? existingUser.firstName,
        updateOptions.lastName ?? existingUser.lastName,
        updateOptions.image ?? existingUser.image,
        updateOptions.phone ?? existingUser.phone,
        existingUser.authProvider,
        existingUser.authProviderId,
        existingUser.createdAt,
        new Date(),
        existingUser.rol,
        existingUser.isActive,
        existingUser.favouritePrograms
    );
}


  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}

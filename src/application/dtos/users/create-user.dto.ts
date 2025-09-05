import { AuthProviderOptions } from "../../../domain/entities/user.entity";

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  image: string; 
  authProvider: AuthProviderOptions;
  authProviderId: string;
  phone?: number | undefined;
}

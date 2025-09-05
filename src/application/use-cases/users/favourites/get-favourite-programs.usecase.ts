import { FavouritePrograms } from "../../../../domain/entities/favourite-program.entity";
import { UserNotFoundError } from "../../../../domain/errors/UserNotFoundError";
import { FavouriteRepository } from "../../../../domain/repositories/favourite.repository";
import { UserRepository } from "../../../../domain/repositories/user.repository";


interface FavouriteProgramCase {
    exec: (userId: number) => Promise<FavouritePrograms[] | null>
}

export class GetFavouriteProgramsUseCase implements FavouriteProgramCase {
    constructor(
        private readonly favouriteRepository: FavouriteRepository,
        private readonly userRepository: UserRepository
    ){}
    
    async exec(userId: number): Promise<FavouritePrograms[] | null> {
        const existsUser = await this.userRepository.findById(userId);
        if (!existsUser) {
            throw new UserNotFoundError(userId);
        }
        
        return await this.favouriteRepository.getFavourites(userId);
    }
}
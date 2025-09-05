import { FavouritePrograms } from "../entities/favourite-program.entity";

export abstract class FavouriteRepository {
    abstract getFavourites(userId: number): Promise<FavouritePrograms[] | null>
    abstract removeFavourites(userId: number): Promise<void>
    abstract addFavourites(userId: number, programId: number): Promise<void>
}
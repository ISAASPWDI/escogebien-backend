import { FavouritePrograms } from "../entities/favourite-program.entity";

export abstract class FavouriteDataSource {
    abstract getFavourites(userId: number): Promise<FavouritePrograms[] | null>
    abstract removeFavourites(userId: number): Promise<void>
    abstract addFavourites(userId: number, programId: number): Promise<void>
}
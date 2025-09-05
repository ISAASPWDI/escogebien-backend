import { FavouriteDataSource } from "../../domain/datasources/favourite.datasource";
import { FavouritePrograms } from "../../domain/entities/favourite-program.entity";
import { FavouriteRepository } from "../../domain/repositories/favourite.repository";

export class FavouriteProgramImpl implements FavouriteRepository {
    constructor(
        private readonly favouriteProgram: FavouriteDataSource
    ){}
    async getFavourites(userId: number): Promise<FavouritePrograms[] | null> {
        return await this.favouriteProgram.getFavourites(userId)
    }
    async removeFavourites(userId: number): Promise<void> {
        await this.favouriteProgram.removeFavourites(userId)
    }
    async addFavourites(userId: number, programId: number): Promise<void> {
        await this.favouriteProgram.addFavourites(userId, programId)
    }

}
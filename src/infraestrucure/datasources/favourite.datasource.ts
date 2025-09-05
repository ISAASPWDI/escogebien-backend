import { Pool } from "pg";
import { FavouriteDataSource } from "../../domain/datasources/favourite.datasource";
import { FavouritePrograms } from "../../domain/entities/favourite-program.entity";

export class FavouriteProgramImpl implements FavouriteDataSource{
    constructor(
        private pool: Pool
    ){}
    async getFavourites(userId: number): Promise<FavouritePrograms[] | null> {
        const query = `
            SELECT p.program_id, p.program_name, u.siglas FROM programs p
            INNER JOIN program_universities pu ON p.program_id = pu.program_id
            LEFT JOIN universities u ON pu.university_id = u.university_id
            LEFT JOIN favourite_programs fp ON p.program_id = fp.program_id
            WHERE fp.user_id = $1
        `;
        const favourites = await this.pool.query(query, [userId])
        return favourites.rows || null
    }
    async removeFavourites(userId: number): Promise<void> {
        const query = `
            DELETE FROM favourite_programs 
            WHERE user_id = $1
        `;
        await this.pool.query(query, [userId])
    }
    async addFavourites(userId: number, programId: number): Promise<void> {
        const query = `
            INSERT INTO favourite_programs (user_id, program_id) VALUES ($1, $2)
        `;
        await this.pool.query(query, [userId, programId])
    }

}
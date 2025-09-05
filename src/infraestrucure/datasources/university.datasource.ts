import { Pool } from "pg";
import { UniversityResponseDTO } from "../../application/dtos/universities/UniversityResponseDTO";
import { UniversityDataSource } from "../../domain/datasources/university.datasource";

export class UniversityDataSourceImpl implements UniversityDataSource {
    constructor(
        private readonly pool: Pool
    ) { }
    async getUniversities(
    page: number,
    limit: number,
    program_id?: number
): Promise<UniversityResponseDTO> {
    let universities;
    let totalUniversities;
    let filteredProgram = false;

    const offset = (page - 1) * limit;

    if (!program_id || program_id === null) {
        const countResult = await this.pool.query("SELECT COUNT(*) FROM universities");
        totalUniversities = parseInt(countResult.rows[0].count);

        universities = await this.pool.query(
            "SELECT * FROM universities LIMIT $1 OFFSET $2", 
            [limit, offset]
        );
    } else {
        const countQuery = `
            SELECT COUNT(*) FROM universities u
            LEFT JOIN program_universities pu ON u.university_id = pu.university_id
            WHERE pu.program_id = $1
        `;
        const countResult = await this.pool.query(countQuery, [program_id]);
        totalUniversities = parseInt(countResult.rows[0].count);

        const query = `
            SELECT u.* FROM universities u
            LEFT JOIN program_universities pu ON u.university_id = pu.university_id
            WHERE pu.program_id = $1
            LIMIT $2 OFFSET $3
        `;
        universities = await this.pool.query(query, [program_id, limit, offset]);
        filteredProgram = true;
    }

    const totalPages = Math.ceil(totalUniversities / limit);
    if (page > totalPages) {
        throw new Error(`Page ${page} is out of range. Total pages: ${totalPages}`);
    }

    const hasMoreUniversities = page < totalPages;

    return {
        universities: universities.rows,
        pagination: {
            currentPage: page,
            totalPages: totalPages,
            totalUniversities: totalUniversities,
            hasMore: hasMoreUniversities,
            perPage: limit
        },
        filteredByProgram: filteredProgram
    };
}
}
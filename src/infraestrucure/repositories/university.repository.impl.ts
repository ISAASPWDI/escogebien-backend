import { UniversityResponseDTO } from "../../application/dtos/universities/UniversityResponseDTO";
import { UniversityDataSource } from "../../domain/datasources/university.datasource";
import { UniversityRepository } from "../../domain/repositories/universities.repository";

export class UniversityRepositoryImpl implements UniversityRepository{
    constructor(
        private readonly universityDataSource: UniversityDataSource
    ){}
    async getUniversities(
        page: number, 
        limit: number, 
        program_id?: number): Promise<UniversityResponseDTO> {
        return await this.universityDataSource.getUniversities(page,limit,program_id)
    }
    
}

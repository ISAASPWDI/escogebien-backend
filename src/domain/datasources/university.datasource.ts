import { UniversityResponseDTO } from "../../application/dtos/universities/UniversityResponseDTO";

export abstract class UniversityDataSource {
    abstract getUniversities (
        page: number, 
        limit: number, 
        program_id?: number
    ): Promise<UniversityResponseDTO>;
}
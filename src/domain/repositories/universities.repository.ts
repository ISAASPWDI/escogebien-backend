import { UniversityResponseDTO } from "../../application/dtos/universities/UniversityResponseDTO";

export abstract class UniversityRepository {
    abstract getUniversities (
        page: number, 
        limit: number, 
        program_id?: number
    ): Promise<UniversityResponseDTO>;
}
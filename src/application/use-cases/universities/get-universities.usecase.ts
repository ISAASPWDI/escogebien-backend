import { UniversityRepository } from "../../../domain/repositories/universities.repository";
import { UniversityResponseDTO } from "../../dtos/universities/UniversityResponseDTO";

interface GetUniversitiesCase {
    exec: (
        page: number, 
        limit: number, 
        program_id?: number
    ) => Promise<UniversityResponseDTO>
}
export class GetUniversitiesUseCase implements GetUniversitiesCase {
    constructor(
        private readonly universityRepository: UniversityRepository
    ) {}
    async exec (
        page: number, 
        limit: number, 
        program_id?: number): Promise<UniversityResponseDTO> {

            if ( !page || !limit ) throw new Error("Faltan algunos campos")

            const universities = await this.universityRepository.getUniversities(page,limit, program_id)

            return universities;
        }

}
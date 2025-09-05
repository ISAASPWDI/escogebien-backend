
import { ProgramRepository } from "../../../domain/repositories/program.repository";
import { PaginationProgramResponseDTO } from "../../dtos/programs/PaginationProgramResponseDTO";

// FindProgramByFiltersUseCase
interface PaginatedProgramsCase {
    exec: (page: number, limit: number) => Promise<PaginationProgramResponseDTO>
}

export class PaginatedProgramsUseCase implements PaginatedProgramsCase {
    constructor(
        private readonly programRepository: ProgramRepository
    ){}
    async exec (page: number, limit: number): Promise<PaginationProgramResponseDTO> {
        if (!page || !limit) throw new Error("Faltan campos para la paginación")    
        return await this.programRepository.findProgramsByPagination(page, limit)
    }
}
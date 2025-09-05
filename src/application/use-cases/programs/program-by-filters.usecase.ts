import { FilterOptions, Program } from "../../../domain/entities/program.entity";
import { ProgramRepository } from "../../../domain/repositories/program.repository";

// FindProgramByFiltersUseCase
interface FindProgramByFiltersCase {
    exec: (filterData: FilterOptions) => Promise<Program[] | null>
}

export class FindProgramByFiltersUseCase implements FindProgramByFiltersCase {
    constructor(
        private readonly programRepository: ProgramRepository
    ){}
    async exec (filterData: FilterOptions): Promise<Program[] | null> {
        return await this.programRepository.findProgramsByFilters(filterData)
    }
}
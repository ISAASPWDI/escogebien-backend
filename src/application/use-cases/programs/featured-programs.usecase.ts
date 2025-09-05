import { Program } from "../../../domain/entities/program.entity";
import { ProgramRepository } from "../../../domain/repositories/program.repository";

interface FeaturedProgramCase {
    exec: () => Promise<Program[] | null>
}

export class FeaturedProgramUseCase implements FeaturedProgramCase {
    constructor(
        private readonly programRepository: ProgramRepository
    ){}
    async exec(): Promise<Program[] | null> {
        const programs = await this.programRepository.findFeaturedPrograms();
        
        if(programs?.length === 0) return []

        return programs;
    }
}
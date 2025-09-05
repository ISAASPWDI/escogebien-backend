import { PaginationProgramResponseDTO } from "../../application/dtos/programs/PaginationProgramResponseDTO";
import { ProgramDataSource } from "../../domain/datasources/program.datasource";
import { Program, FilterOptions } from "../../domain/entities/program.entity";
import { ProgramRepository } from "../../domain/repositories/program.repository";

export class ProgramRepositoryImpl implements ProgramRepository{
    constructor(
        private readonly programDataSource: ProgramDataSource
    ) {}
    async findProgramsByPagination(page: number, limit: number): Promise<PaginationProgramResponseDTO> {
        return await this.programDataSource.findProgramsByPagination(page, limit);
    }
    async findFeaturedPrograms(): Promise<Program[] | null> {
        return await this.programDataSource.findFeaturedPrograms();
    }
    async findProgramsByCategory(categoryId: string): Promise<Program[] | null> {
        return await this.programDataSource.findProgramsByCategory(categoryId);
    }
    async findProgramsByFilters(filterData: FilterOptions): Promise<Program[] | null> {
        return await this.programDataSource.findProgramsByFilters(filterData);
    }

}
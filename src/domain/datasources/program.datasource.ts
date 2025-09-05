import { PaginationProgramResponseDTO } from "../../application/dtos/programs/PaginationProgramResponseDTO";
import { FilterOptions, Program } from "../entities/program.entity";

export abstract class ProgramDataSource {
  // Define datasources methods here
  abstract findFeaturedPrograms(): Promise<Program[] | null>;
  abstract findProgramsByCategory(categoryId: string): Promise<Program[] | null>
  abstract findProgramsByFilters(filterData: FilterOptions): Promise<Program[] | null>  
  abstract findProgramsByPagination(page: number, limit: number): Promise<PaginationProgramResponseDTO>;
}
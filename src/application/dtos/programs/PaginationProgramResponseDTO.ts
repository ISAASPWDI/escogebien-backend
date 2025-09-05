import { Program } from "../../../domain/entities/program.entity";

interface PaginationOptions {
    currentPage: number;
    totalPages: number;
    totalPrograms: number;
    hasMore: boolean;
    perPage: number;
}

export class PaginationProgramResponseDTO {
    constructor(
        public programs: Program[],
        public pagination: PaginationOptions
    ){}
}
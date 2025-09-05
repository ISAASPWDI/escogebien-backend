import { University } from "../../../domain/entities/university.entity";

interface PaginationOptions {
    currentPage: number;
    totalPages: number;
    totalUniversities: number;
    hasMore: boolean;
    perPage: number;
}

export class UniversityResponseDTO {
    constructor(
        public universities: University[],
        public pagination: PaginationOptions,
        public filteredByProgram: boolean
    ){}

}
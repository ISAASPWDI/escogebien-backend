import { Request, Response } from "express";
import { FeaturedProgramUseCase } from "../../application/use-cases/programs/featured-programs.usecase";
import { FindProgramByFiltersUseCase } from "../../application/use-cases/programs/program-by-filters.usecase";
import { FilterOptions } from "../../domain/entities/program.entity";
import { PaginatedProgramsUseCase } from "../../application/use-cases/programs/programs-by-pagination.usecase";
import { parseNumber, parseString, parseCategories } from '../helpers/parseQueries';

export class ProgramController {
    constructor(
        private readonly featuredProgram: FeaturedProgramUseCase,
        private readonly programByFilters: FindProgramByFiltersUseCase,
        private readonly paginatedPrograms: PaginatedProgramsUseCase
    ) { }

    async getPrograms(req: Request, res: Response): Promise<void> {
        try {
            if (req.query && Object.keys(req.query).length > 0) {
                const { categories, degreeLevel, duration, modality, minPrice, maxPrice, price } = req.query;



                const filterData: FilterOptions = {
                    minPrice: parseNumber(minPrice),
                    maxPrice: parseNumber(maxPrice),
                    price: parseNumber(price),
                    modality: parseString(modality),
                    duration: parseString(duration),
                    degreeLevel: parseString(degreeLevel),
                    categories: parseCategories(categories)
                };

                console.log('🔍 Filtros aplicados:', filterData);

                const programs = await this.programByFilters.exec(filterData);

                res.status(200).json({
                    success: true,
                    programs,
                    filters: filterData,
                    total: programs?.length,
                    message: "Programas filtrados obtenidos exitosamente"
                });
                return;
            }

            // Si no hay filtros, obtener programas destacados
            const programs = await this.featuredProgram.exec();
            console.log('✨ Programas destacados obtenidos:', programs?.length);

            // Simular delay


            res.status(200).json({
                success: true,
                programs,
                message: "Programas destacados obtenidos exitosamente"
            });

        } catch (error) {
            console.error('❌ Error en getPrograms:', error);
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : "Error desconocido",
            });
        }
    }
    async getPaginatedPrograms(req: Request, res: Response): Promise<void> {
        const { page, limit } = req.query

        
        try {
            const paginatedPrograms = await this.paginatedPrograms.exec(
            parseNumber(page)!, parseNumber(limit)!)

            console.log(paginatedPrograms);
            res.status(200).json(paginatedPrograms)
            
        } catch (error) {
            console.error('❌ Error en getPaginatedPrograms:', error);
            res.status(400).json({
                success: false,
                error: error instanceof Error ? error.message : "Error desconocido",
            });
        }

    }
}
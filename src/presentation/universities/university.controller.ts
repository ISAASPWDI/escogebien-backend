import { Request, Response } from "express";
import { GetUniversitiesUseCase } from "../../application/use-cases/universities/get-universities.usecase";

interface UserQuery {
    page?: string;
    limit?: string;
    program_id?: string;
}

export class UniversityController {
    constructor(
        private readonly getUniversitiesUseCase: GetUniversitiesUseCase
    ) { }

    async getUniversities(req: Request<{}, any, any, UserQuery>, res: Response): Promise<void> {
        try {
            const { page, limit, program_id } = req.query;

            // Parse and validate query parameters
            const parsedPage = page ? parseInt(page, 10) : 1;
            const parsedLimit = limit ? parseInt(limit, 10) : 3;
            const parsedProgramId = program_id ? parseInt(program_id, 10) : undefined;

            // Validate parsed values
            if (isNaN(parsedPage) || parsedPage < 1) {
                res.status(400).json({
                    success: false,
                    error: "Page must be a positive number"
                });
                return;
            }

            if (isNaN(parsedLimit) || parsedLimit < 1) {
                res.status(400).json({
                    success: false,
                    error: "Limit must be a positive number"
                });
                return;
            }

            if (program_id && isNaN(parsedProgramId!)) {
                res.status(400).json({
                    success: false,
                    error: "Program ID must be a valid number"
                });
                return;
            }

            if (parsedProgramId !== undefined && parsedProgramId !== null) {
                const filteredUniversities = await this.getUniversitiesUseCase.exec(
                    parsedPage,
                    parsedLimit,
                    parsedProgramId
                );
                res.status(200).json(filteredUniversities);
                return;
            }

            const universities = await this.getUniversitiesUseCase.exec(parsedPage, parsedLimit);
            res.status(200).json(universities);
        } catch (error) {
            console.error('❌ Error en getUniversities:', error);
            res.status(500).json({
                success: false,
                error: error instanceof Error ? error.message : "Error desconocido",
            });
        }
    }
}
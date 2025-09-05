
import { Router } from "express";
import { ProgramRepositoryImpl } from "../../infraestrucure/repositories/program.repository.impl";
import { programDataSource } from "../../config/config";
import { ProgramController } from "./program.controller";
import { FeaturedProgramUseCase } from "../../application/use-cases/programs/featured-programs.usecase";
import { FindProgramByFiltersUseCase } from "../../application/use-cases/programs/program-by-filters.usecase";
import { PaginatedProgramsUseCase } from "../../application/use-cases/programs/programs-by-pagination.usecase";

const router = Router();

// infra
const programRepository = new ProgramRepositoryImpl(programDataSource);

// casos de uso
const featuredProgramUseCase = new FeaturedProgramUseCase(programRepository);
const findProgramByFiltersUseCase = new FindProgramByFiltersUseCase(programRepository);
const paginatedProgramsUseCase = new PaginatedProgramsUseCase(programRepository)

// controller
const getProgramsController = new ProgramController(
    featuredProgramUseCase, 
    findProgramByFiltersUseCase,
    paginatedProgramsUseCase
);

// rutas
router.get("/programs", (req, res) => getProgramsController.getPrograms(req, res));
router.get("/programs/paginated", (req, res) => getProgramsController.getPaginatedPrograms(req, res));

export default router;


import { Router } from "express";

import { universityDataSource } from "../../config/config"
import { UniversityRepositoryImpl } from "../../infraestrucure/repositories/university.repository.impl";
import { GetUniversitiesUseCase } from "../../application/use-cases/universities/get-universities.usecase";
import { UniversityController } from "./university.controller";

const router = Router();

// infra
const universityRepository = new UniversityRepositoryImpl(universityDataSource);

// casos de uso
const getUniversitiesUseCase = new GetUniversitiesUseCase(universityRepository);

// controller
const getUniversitiesController = new UniversityController(
    getUniversitiesUseCase
);

// rutas
router.get("/universities", (req, res) => getUniversitiesController.getUniversities(req, res));

export default router;

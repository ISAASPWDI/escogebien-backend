import { Router } from "express";
import { CategoryDataSourceImpl } from "../../infraestrucure/datasources/category.datasource";
import { CategoryRepositoryImpl } from "../../infraestrucure/repositories/category.repository.impl";
import { FindAllCategoryUseCase } from "../../application/use-cases/categories/find-all-category.usecase";
import { CategoryController } from "./category.controller";
import { categoryDataSource } from "../../config/config";

const router = Router();


const categoryRepository = new CategoryRepositoryImpl(categoryDataSource);
const findAllCategoriesUseCase = new FindAllCategoryUseCase(categoryRepository);
const categoryController = new CategoryController(findAllCategoriesUseCase);

router.get("/categories", (req, res) => categoryController.findAll(req, res));

export default router;

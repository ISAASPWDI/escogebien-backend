
import { Request, Response } from "express";
import { FindAllCategoryUseCase } from "../../application/use-cases/categories/find-all-category.usecase";

export class CategoryController {
    constructor(
        private readonly findAllCategory: FindAllCategoryUseCase
    ) { }

    async findAll(req: Request, res: Response): Promise<void> {
        try {
            const categories = await this.findAllCategory.execute()
            console.log(categories);
            // await new Promise(resolve => setTimeout(resolve, 3000));
            res.status(200).json({categories})
        } catch (error) {
            res.status(400).json({
                error: error instanceof Error ? error.message : "Error desconocido",
            });
        }
    }


}
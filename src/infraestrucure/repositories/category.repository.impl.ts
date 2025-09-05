import { Category } from "../../domain/entities/category.entity";
import { CategoryRepository } from "../../domain/repositories/category.repository";
import { CategoryDataSourceImpl } from "../datasources/category.datasource";

export class CategoryRepositoryImpl implements CategoryRepository{
    constructor(
        private readonly categoryDataSource: CategoryDataSourceImpl
    ) {}
    create(category: Category): Promise<Category> {
        return this.categoryDataSource.create(category);
    }
    findById(id: string): Promise<Category | null> {
        throw new Error("Method not implemented.");
    }
    update(category: Category): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Category[] | null> {
        return this.categoryDataSource.findAll()
    }

}
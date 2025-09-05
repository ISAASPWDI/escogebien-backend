import { Category } from "../entities/category.entity";



export abstract class CategoryRepository{
  abstract create(category: Category): Promise<Category>;
  abstract findById(id: string): Promise<Category | null>;
  abstract update(category: Category): Promise<Category>;
  abstract delete(id: string): Promise<void>;
  abstract findAll(): Promise<Category[] | null>;
}


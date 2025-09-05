import { CategoryRepository } from "../../../domain/repositories/category.repository";
import { Category } from "../../../domain/entities/category.entity";

interface FindAllCategoryCase {
  execute: () => Promise<Category[] | null>;
}

export class FindAllCategoryUseCase implements FindAllCategoryCase {
  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(): Promise<Category[] | null> {
    const categories = await this.categoryRepository.findAll();

    if (categories?.length === 0) return null

    return categories
  }
}

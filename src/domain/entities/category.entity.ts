
export class Category {
  private constructor(
    public readonly id: string,
    public readonly category: string,
  ) {}
//   static create(id: string, categoryName: string): Category {
//     return new Category(id, categoryName);
//   }
//   static update(existingCategory: Category, categoryName: string): Category {
//     return new Category(
//       existingCategory.id,
//       categoryName || existingCategory.categoryName,
//     );
//   }
  
}

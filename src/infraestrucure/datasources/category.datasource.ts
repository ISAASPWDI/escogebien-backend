import { Pool } from "pg";
import { CategoryDataSource } from "../../domain/datasources/category.datasource";
import { Category } from "../../domain/entities/category.entity";

export class CategoryDataSourceImpl implements CategoryDataSource {
    
    constructor(private pool: Pool) {}
    async create(category: Category): Promise<Category> {
        const query = `INSERT INTO categories (category) VALUES ($1) RETURNING *`;
        const result = await this.pool.query(query, [category.category])
        return result.rows[0]
    }
    async findById(id: string): Promise<Category | null> {
        const query = `SELECT * FROM categories WHERE category_id = $1`;
        const result = await this.pool.query(query,[id])
        return result.rows[0] || null
    }
    async update(category: Category): Promise<Category> {
        const query = `UPDATE categories SET category = $1`;
        const result = await this.pool.query(query, [category.category])
        return result.rows[0]
    }
    async delete(id: string): Promise<void> {
        const query = `DELETE FROM categories WHERE category_id = $1` 
        await this.pool.query(query, [id])
    }
    async findAll(): Promise<Category[] | null> {
        const result = await this.pool.query("SELECT * FROM categories");
        return result.rows || null
    }

}
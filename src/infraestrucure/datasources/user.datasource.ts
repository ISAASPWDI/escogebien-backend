// infrastructure/datasources/user.datasource.ts
import { Pool } from "pg";
import { User } from "../../domain/entities/user.entity";
import { UserDataSource } from "../../domain/datasources/user.datasource";

export class UserDataSourceImpl implements UserDataSource {

  constructor(private pool: Pool) {}

  async create(user: User): Promise<User> {
    const query = `
      INSERT INTO users (uuid, email, firstName, lastName, image, auth_provider, auth_provider_id, createdat, updatedat, rol, is_active)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *;
    `;
    // array para no pasar todos los params a la query
    const values = [
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.image,
      user.authProvider,
      user.authProviderId,
      user.createdAt,
      user.updatedAt,
      user.rol,
      user.isActive,
    ];
    const result = await this.pool.query(query, values);
    return result.rows[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.pool.query("SELECT * FROM users WHERE email = $1 LIMIT 1", [email]);
    return result.rows[0] || null;
  }

  async findByAuthProvider(provider: string, providerId: string): Promise<User | null> {
    const result = await this.pool.query(
      "SELECT * FROM users WHERE auth_provider = $1 AND auth_provider_id = $2 LIMIT 1",
      [provider, providerId]
    );
    return result.rows[0] || null;
  }

  async findById(id: number): Promise<User | null> {
    const result = await this.pool.query("SELECT * FROM users WHERE user_id = $1 LIMIT 1", [id]);
    return result.rows[0] || null;
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    const setClauses = Object.keys(updateData).map((key, i) => `${key} = $${i + 2}`);
    const values = [id, ...Object.values(updateData)];
    const query = `
      UPDATE users
      SET ${setClauses.join(", ")}, updated_at = NOW()
      WHERE user_id = $1
      RETURNING *;
    `;
    const result = await this.pool.query(query, values);
    if (!result.rows[0]) throw new Error("Usuario no encontrado");
    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    await this.pool.query("DELETE FROM users WHERE user_id = $1", [id]);
  }
}

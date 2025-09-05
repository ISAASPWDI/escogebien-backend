// src/config/config.ts
import { Pool } from "pg";
import { ProgramDataSourceImpl } from "../infraestrucure/datasources/program.datasource";
import { UserDataSourceImpl } from "../infraestrucure/datasources/user.datasource";
import { CategoryDataSourceImpl } from "../infraestrucure/datasources/category.datasource";
import { UniversityDataSourceImpl } from "../infraestrucure/datasources/university.datasource";
import { FavouriteProgramImpl } from "../infraestrucure/datasources/favourite.datasource";

export const pool = new Pool({
  user: process.env.POSTGRES_USER || "stivens",
  password: process.env.POSTGRES_PASSWORD || "17032004",
  database: process.env.POSTGRES_DB || "escogebien",
  host: process.env.POSTGRES_HOST || "localhost",
  port: Number(process.env.POSTGRES_PORT) || 5433,
});

// Instancia de datasources
export const programDataSource = new ProgramDataSourceImpl(pool)
export const categoryDataSource = new CategoryDataSourceImpl(pool)
export const userDataSource = new UserDataSourceImpl(pool)
export const universityDataSource = new UniversityDataSourceImpl(pool)
export const favouriteDataSource = new FavouriteProgramImpl(pool)

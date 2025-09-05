import { Pool } from "pg";
import { ProgramDataSource } from "../../domain/datasources/program.datasource";
import { Program, FilterOptions, SqlValue } from "../../domain/entities/program.entity";
import { PaginationProgramResponseDTO } from "../../application/dtos/programs/PaginationProgramResponseDTO";

export class ProgramDataSourceImpl implements ProgramDataSource {
    constructor(private pool: Pool) { }

    async findFeaturedPrograms(): Promise<Program[] | null> {
        const query = `
      SELECT 
        p.*,
        pd.*,
        COALESCE(json_agg(DISTINCT jsonb_build_object(
        'malla_curricular_id', m.malla_curricular_id,
        'modulo', m.modulo,
        'nombre', m.name
        )) FILTER (WHERE m.malla_curricular_id IS NOT NULL), '[]') AS mallas,

        COALESCE(json_agg(DISTINCT jsonb_build_object(
          'docentes_id', d.docentes_id,
          'nombre', d.docente_name
        )) FILTER (WHERE d.docentes_id IS NOT NULL), '[]') AS docentes,

        COALESCE(json_agg(DISTINCT jsonb_build_object(
          'university_id', u.university_id,
          'nombre', u.university_name
        )) FILTER (WHERE u.university_id IS NOT NULL), '[]') AS universities,

        COALESCE(json_agg(DISTINCT jsonb_build_object(
          'requisitos_id', r.requisitos_id,
          'descripcion', r.requisito
        )) FILTER (WHERE r.requisitos_id IS NOT NULL), '[]') AS requisitos

      FROM programs p
      INNER JOIN program_details pd ON p.program_detail_id = pd.program_detail_id
      LEFT JOIN program_mallas pm ON p.program_id = pm.program_id
      LEFT JOIN malla_curriculares m ON pm.malla_curricular_id = m.malla_curricular_id
      LEFT JOIN program_docentes pdn ON p.program_id = pdn.program_id
      LEFT JOIN docentes d ON pdn.docentes_id = d.docentes_id
      LEFT JOIN program_universities pu ON p.program_id = pu.program_id
      LEFT JOIN universities u ON pu.university_id = u.university_id
      LEFT JOIN program_requisitos pr ON p.program_id = pr.program_id
      LEFT JOIN requisitos r ON pr.requisitos_id = r.requisitos_id
      WHERE pd.calificacion >= 4.7
      GROUP BY p.program_id, pd.program_detail_id
      ORDER BY pd.calificacion DESC;
    `;

        const result = await this.pool.query(query);
        return result.rows || null;
    }

    async findProgramsByCategory(categoryId: string): Promise<Program[] | null> {
        const query = `
            SELECT p.*, pd.* FROM programs p
            INNER JOIN program_details pd ON p.program_detail_id = pd.program_detail_id
            LEFT JOIN program_categories pc ON p.program_id = pc.program_id
            WHERE pc.category_id = $1
        `;
        const result = await this.pool.query(query, [categoryId]);
        return result.rows || null;
    }

    async findProgramsByFilters(filterData: FilterOptions): Promise<Program[] | null> {
        const { minPrice, maxPrice, modality, duration, degreeLevel, categories } = filterData;

        let query = `
      SELECT 
        p.*,
        pd.*,
        COALESCE(json_agg(DISTINCT jsonb_build_object(
        'malla_curricular_id', m.malla_curricular_id,
        'modulo', m.modulo,
        'nombre', m.name
        )) FILTER (WHERE m.malla_curricular_id IS NOT NULL), '[]') AS mallas,


        COALESCE(json_agg(DISTINCT jsonb_build_object(
          'docentes_id', d.docentes_id,
          'nombre', d.docente_name
        )) FILTER (WHERE d.docentes_id IS NOT NULL), '[]') AS docentes,

        COALESCE(json_agg(DISTINCT jsonb_build_object(
          'university_id', u.university_id,
          'nombre', u.university_name
        )) FILTER (WHERE u.university_id IS NOT NULL), '[]') AS universities,

        COALESCE(json_agg(DISTINCT jsonb_build_object(
          'requisitos_id', r.requisitos_id,
          'descripcion', r.requisito
        )) FILTER (WHERE r.requisitos_id IS NOT NULL), '[]') AS requisitos

      FROM programs p
      INNER JOIN program_details pd ON p.program_detail_id = pd.program_detail_id
      LEFT JOIN program_categories pc ON p.program_id = pc.program_id
      LEFT JOIN program_mallas pm ON p.program_id = pm.program_id
      LEFT JOIN malla_curriculares m ON pm.malla_curricular_id = m.malla_curricular_id
      LEFT JOIN program_docentes pdn ON p.program_id = pdn.program_id
      LEFT JOIN docentes d ON pdn.docentes_id = d.docentes_id
      LEFT JOIN program_universities pu ON p.program_id = pu.program_id
      LEFT JOIN universities u ON pu.university_id = u.university_id
      LEFT JOIN program_requisitos pr ON p.program_id = pr.program_id
      LEFT JOIN requisitos r ON pr.requisitos_id = r.requisitos_id
      WHERE 1=1
    `;

        const values: SqlValue[] = [];
        let paramCounter = 1;

        if (minPrice !== null && minPrice !== undefined) {
            query += ` AND pd.precio >= $${paramCounter}`;
            values.push(minPrice);
            paramCounter++;
        }
        if (maxPrice !== null && maxPrice !== undefined) {
            query += ` AND pd.precio <= $${paramCounter}`;
            values.push(maxPrice);
            paramCounter++;
        }
        if (modality && modality !== "Todas") {
            query += ` AND pd.modalidad = $${paramCounter}`;
            values.push(modality);
            paramCounter++;
        }
        if (duration && duration !== "Todas") {
            query += ` AND pd.duracion = $${paramCounter}`;
            values.push(duration);
            paramCounter++;
        }
        if (degreeLevel && degreeLevel !== "Todas") {
            query += ` AND pd.grado_estudio = $${paramCounter}`;
            values.push(degreeLevel);
            paramCounter++;
        }
        if (categories && categories.length > 0) {
            query += ` AND pc.category_id = ANY($${paramCounter})`;
            values.push(categories);
            paramCounter++;
        }

        query += `
      GROUP BY p.program_id, pd.program_detail_id
      ORDER BY pd.calificacion DESC
    `;

        console.log("Filter Query:", query);
        console.log("Filter Values:", values);

        const result = await this.pool.query(query, values);
        return result.rows || null;
    }
    async findProgramsByPagination(page: number, limit: number): Promise<PaginationProgramResponseDTO> {
        const offset = (page - 1) * limit;

        const countQuery = `SELECT COUNT(*) FROM programs`;
        const countResult = await this.pool.query(countQuery);
        const totalItems = parseInt(countResult.rows[0].count, 10);
        const totalPages = Math.ceil(totalItems / limit);

        const hasMorePrograms = page < totalPages!

        const query = `
          SELECT p.*, pd.*, 

          COALESCE(json_agg(DISTINCT jsonb_build_object(
          'university_id', u.university_id,
          'nombre', u.university_name
          )) FILTER (WHERE u.university_id IS NOT NULL), '[]') AS universities

          FROM programs p
          INNER JOIN program_details pd ON p.program_detail_id = pd.program_detail_id
          LEFT JOIN program_universities pu ON p.program_id = pu.program_id
          LEFT JOIN universities u ON pu.university_id = u.university_id
          GROUP BY p.program_id, pd.program_detail_id
          LIMIT $1 OFFSET $2
        `;
        const result = await this.pool.query(query, [limit,offset])
        return {
          programs: result.rows,
          pagination: {
            currentPage: page,
            totalPages: totalPages,
            totalPrograms: totalItems,
            hasMore: hasMorePrograms,
            perPage: limit
          }
        }
    }
}
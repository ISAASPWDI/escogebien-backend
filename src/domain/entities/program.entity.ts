import { ProgramDetail } from "./program-detail.entity";
import { ProgramType } from "./program-type";

export interface FilterOptions {
    minPrice?: number
    maxPrice?: number
    price?: number
    modality?: string
    duration?: string
    degreeLevel?: string
    categories?: number[]
}

export type SqlValue = string | number | boolean | (string | number)[];

interface ProgramOptions {
    id: number;
    programName: string;
    description: string;
    type: ProgramType;
    detail: ProgramDetail;
    createdAt: Date;
    updatedAt: Date;
}
export class Program {
  private constructor(
    public readonly id: number,
    public readonly programName: string,
    public readonly description: string,
    public readonly type: ProgramType,
    public readonly detail: ProgramDetail,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(props: ProgramOptions): Program {
    return new Program(
      props.id,
      props.programName,
      props.description,
      props.type,
      props.detail,
      props.createdAt,
      props.updatedAt,
    );
  }
}
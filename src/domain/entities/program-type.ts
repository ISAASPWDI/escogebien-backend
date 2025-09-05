export class ProgramType {
  private constructor(
    public readonly id: number,
    public readonly type: string,
  ) {}

  static create(props: { id: number; type: string }): ProgramType {
    return new ProgramType(props.id, props.type);
  }
}
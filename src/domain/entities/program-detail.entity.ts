interface ProgramDetailOptions {
  id: number;
  duration: string;
  modality: string;
  price: number;
  score: number;
  isAccredited: boolean;
}
export class ProgramDetail {
  private constructor(
    public readonly id: number,
    public readonly duration: string,
    public readonly modality: string,
    public readonly price: number,
    public readonly score: number,
    public readonly isAccredited: boolean,
  ) { }

  static create(props: ProgramDetailOptions): ProgramDetail {
    return new ProgramDetail(
      props.id,
      props.duration,
      props.modality,
      props.price,
      props.score,
      props.isAccredited
    );
  }
}

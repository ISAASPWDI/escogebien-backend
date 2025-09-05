export class University {
    private constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly email: string,
        public readonly numero: number,
        public readonly web_url: number,
        public readonly created_at?: number
    ){}
}
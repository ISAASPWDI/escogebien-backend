import { v4 as uuidv4 } from "uuid";
import type { IdGenerator } from "../../domain/adapters/IdGenerator.ts";


// Adaptador concreto para UUID
export class UuidGenerator implements IdGenerator {
  generate(): string {
    return uuidv4();
  }
}

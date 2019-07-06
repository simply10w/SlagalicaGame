import { ArraySchema } from '@colyseus/schema';

export function emptyArraySchema(arraySchema: ArraySchema) {
  arraySchema.splice(0, arraySchema.length);
}

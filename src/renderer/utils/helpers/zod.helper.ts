import { preprocess, ZodTypeAny } from 'zod';

export const numericString = (schema: ZodTypeAny) =>
  preprocess((arg) => (isNaN(arg as any) ? undefined : Number(arg)), schema);

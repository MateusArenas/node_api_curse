import { z, ZodError, ZodObject, ZodRawShape } from 'zod';

import { InvalidInput } from './exceptions/InvalidInput';

// referência: https://docs.adonisjs.com/guides/validation

export class Validator<T extends ZodRawShape> {
  schema: ZodObject<T>;
  constructor(schema: ZodObject<T>) {
    this.schema = schema;
  }

  async validate(data: z.infer<typeof this.schema>) {
    try {
      const parsed = await this.schema.parseAsync(data);
      return parsed;
    } catch (error) {
      const issue = (error as ZodError).issues.find((issue) => issue);
      throw new InvalidInput(issue?.message ?? 'Scheme validator error.');
    }
  }
}

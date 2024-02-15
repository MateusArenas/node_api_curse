import { z, ZodError, ZodObject, ZodRawShape } from 'zod';

import { BadRequest } from '../exceptions/BadRequest';

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

      throw new BadRequest({
        message: issue?.message ?? 'Scheme validator error.',
      });
    }
  }
}

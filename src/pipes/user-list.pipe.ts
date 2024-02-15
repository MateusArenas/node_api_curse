import { NextFunction, Request, Response } from 'express';
import { z, ZodError, ZodObject, ZodRawShape, ZodSchema } from 'zod';

import { listUserSchema, ListUsersDto } from '../dtos/users/user-list.dto';
import { BadRequest } from '../exceptions/BadRequest';

// Middleware para validar a query da solicitação
export function userListPipe<T extends ZodRawShape>(
  schema: typeof listUserSchema
) {
  return (
    req: Request<{}, {}, {}, ListUsersDto>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Valida o query da solicitação
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      const issue = (error as ZodError).issues.find((issue) => issue);

      throw new BadRequest({
        message: issue?.message ?? 'Scheme validator error.',
      });
    }
  };
}

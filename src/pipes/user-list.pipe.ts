import { Request, Response, NextFunction } from 'express';
import { z, ZodError, ZodObject, ZodRawShape } from 'zod';
import { BadRequest } from '../exceptions/BadRequest';
import { ListUsersDto } from '../dtos/users/user-list.dto';

// Middleware para validar a query da solicitação
export function userListPipe<T extends ZodRawShape>(schema: ZodObject<T>) {
  return (
    req: Request<{}, {}, {}, ListUsersDto>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Valida o query da solicitação
      req.query = schema.parse(req.query) as unknown as ListUsersDto;
      next();
    } catch (error) {
      throw new BadRequest({ message: (error as ZodError).message });
    }
  };
}

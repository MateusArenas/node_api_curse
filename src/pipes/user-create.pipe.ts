import { Request, Response, NextFunction } from 'express';
import { z, ZodError, ZodObject, ZodRawShape } from 'zod';
import { BadRequest } from '../exceptions/BadRequest';

// Middleware para validar o corpo da solicitação
export function userCreatePipe<T extends ZodRawShape>(schema: ZodObject<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      throw new BadRequest(error as any);
    }
  };
}

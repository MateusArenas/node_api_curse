import { Request, Response, NextFunction } from 'express';
import { z, ZodError, ZodObject, ZodRawShape } from 'zod';
import { BadRequest } from '../exceptions/BadRequest';

// Middleware para validar o corpo da solicitação e o ID da rota
export function userUpdatePipe<T extends ZodRawShape>(schema: ZodObject<T>) {
  return (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      // Valida o ID da rota
      req.params.id = z.string().parse(req.params.id);
      // Valida o corpo da solicitação
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      throw new BadRequest({ message: (error as ZodError).message });
    }
  };
}

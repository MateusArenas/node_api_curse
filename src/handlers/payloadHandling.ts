import { NextFunction, Request, Response } from 'express';

// Estendendo o tipo Request do Express para adicionar o método 'all' e 'qs'
declare global {
  namespace Express {
    interface Request {
      all<Output extends Record<string, any>>(): Output;
      qs<Output extends Record<string, any>>(): Output;
    }
  }
}

// Middleware para adicionar o método 'all' e 'qs' ao objeto de solicitação
export function payloadHandling(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  req.all = function () {
    return Object.assign(req.query, req.params, req.body);
  };
  req.qs = function () {
    return Object.assign(req.query);
  };
  next();
}

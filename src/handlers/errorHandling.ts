import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/HttpException';

export function errorHandling(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);

  if (error instanceof HttpException) {
    return res.status(error.status).json(error);
  }

  return res.status(500).json({ message: 'Internal server error' });
}

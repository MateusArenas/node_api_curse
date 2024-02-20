import { NextFunction, Request, Response } from 'express';

import { Exception } from '../../../core/exceptions/Exception';
import { InvalidInput } from '../../../core/exceptions/InvalidInput';
import { NotFound } from '../../../core/exceptions/NotFound';
import { ServerError } from '../../../core/exceptions/ServerError';
import { Unauthorized } from '../../../core/exceptions/Unauthorized';

// https://github.com/jshttp/http-errors?tab=readme-ov-file#list-of-all-constructors

export function errorHandling(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof Exception) {
    let statusCode = 500;
    switch (error.constructor) {
      case InvalidInput:
        statusCode = 400;
        break;
      case Unauthorized:
        statusCode = 401;
        break;
      case NotFound:
        statusCode = 404;
        break;
      case ServerError:
        statusCode = 500;
        break;
    }
    return res.status(statusCode).json(error);
  }

  return res.status(500).json({ message: 'Internal server error' });
}

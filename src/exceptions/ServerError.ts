import { HttpException, ExceptionResponse } from './HttpException';

export class ServerError extends HttpException {
  constructor(response: ExceptionResponse, code = 'SERVER_ERROR') {
    super(response, 500, code);
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

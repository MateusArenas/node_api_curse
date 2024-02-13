import { HttpException, ExceptionResponse } from './HttpException';

export class Unauthorized extends HttpException {
  constructor(response: ExceptionResponse, code = 'UNAUTHORIZED') {
    super(response, 401, code);
    Object.setPrototypeOf(this, Unauthorized.prototype);
  }
}

import { HttpException, ExceptionResponse } from './HttpException';

export class NotFound extends HttpException {
  constructor(response: ExceptionResponse, code = 'NOT_FOUND') {
    super(response, 404, code);
    Object.setPrototypeOf(this, NotFound.prototype);
  }
}

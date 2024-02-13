import { HttpException, ExceptionResponse } from './HttpException';

export class BadRequest extends HttpException {
  constructor(response: ExceptionResponse, code = 'BAD_REQUEST') {
    super(response, 400, code);
    Object.setPrototypeOf(this, BadRequest.prototype);
  }
}

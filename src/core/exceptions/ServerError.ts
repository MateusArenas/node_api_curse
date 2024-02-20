import { Exception } from './Exception';

export class ServerError extends Exception {
  constructor(message: string, code = 'SERVER_ERROR') {
    super(message, code);
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

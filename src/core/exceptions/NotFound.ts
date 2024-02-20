import { Exception } from './Exception';

export class NotFound extends Exception {
  constructor(message: string, code = 'NOT_FOUND') {
    super(message, code);
    Object.setPrototypeOf(this, NotFound.prototype);
  }
}

import { Exception } from './Exception';

export class Unauthorized extends Exception {
  constructor(message: string, code = 'UNAUTHORIZED') {
    super(message, code);
    Object.setPrototypeOf(this, Unauthorized.prototype);
  }
}

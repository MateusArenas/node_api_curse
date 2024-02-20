import { Exception } from './Exception';

export class Conflict extends Exception {
  constructor(message: string, code = 'CONFLICT') {
    super(message, code);
    Object.setPrototypeOf(this, Conflict.prototype);
  }
}

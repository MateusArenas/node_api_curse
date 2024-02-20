import { Exception } from './Exception';

export class InvalidInput extends Exception {
  constructor(message: string, code = 'INVALID_INPUT') {
    super(message, code);
    Object.setPrototypeOf(this, InvalidInput.prototype);
  }
}

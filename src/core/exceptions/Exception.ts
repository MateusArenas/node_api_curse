export class Exception extends Error {
  message: string;
  code: string;

  constructor(message: string, code: string = 'EXCEPTION') {
    super(message);
    this.message = message;
    this.code = code;
    Object.setPrototypeOf(this, Exception.prototype);
  }

  public toJSON() {
    return Object.assign({
      message: this.message,
      code: this.code,
    });
  }
}

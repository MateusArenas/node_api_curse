export type ExceptionResponse = {
  message: string;
  [key: string]: any;
};

export class HttpException extends Error {
  response: ExceptionResponse;
  status: number;
  code: string;

  constructor(
    response: ExceptionResponse,
    status: number = 500,
    code: string = 'GENERIC_ERROR'
  ) {
    super(response.message);
    this.response = response;
    this.status = status;
    this.code = code;
    Object.setPrototypeOf(this, HttpException.prototype);
  }

  public toJSON() {
    return Object.assign(this.response, {
      status: this.status,
      code: this.code,
    });
  }
}

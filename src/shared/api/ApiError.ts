export class ServerTimeOutError {}

export class CommonServerError extends Error {
  code?: string;
  status?: number;

  constructor({ code, status }: CommonServerError) {
    super();
    this.code = code;
    this.status = status;
  }
}

export type ErrorResponseProps = {
  message: string;
  status: number;
  code: string;
};

export class SessionTimeOutError extends Error {}

export class MaintenanceServerError extends Error {}

export class ErrorResponse extends Error {
  status: number;
  code: string;
  message: string;

  constructor({ code, status, message }: ErrorResponse) {
    super(message);
    this.status = status;
    this.code = code;
    this.message = message;
  }
}

export type ApiError =
  | ErrorResponse
  | ServerTimeOutError
  | CommonServerError
  | SessionTimeOutError
  | MaintenanceServerError;

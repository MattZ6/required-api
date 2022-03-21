import { ApplicationError } from '@domain/errors';

import { IHttpResponse } from '@presentation/protocols/Http';
import { ValidationError } from '@presentation/validations/errors';

type ErrorDTO = {
  code: string;
  message: string;
};

function toErrorDTO(error: ApplicationError | Error): ErrorDTO {
  let code = 'internal';

  if (error instanceof ApplicationError) {
    code = error.code;
  }

  return {
    code,
    message: error.message,
  };
}

export function ok<T = any>(data: T): IHttpResponse<T> {
  return {
    statusCode: 200,
    body: data,
  };
}

export function created<T = any>(data?: T): IHttpResponse<T> {
  return {
    statusCode: 201,
    body: data,
  };
}

export function noContent(): IHttpResponse<void> {
  return {
    statusCode: 204,
  };
}

type ValidationErrorData = {
  field?: string;
  type?: string;
  message: string;
};

type ValidationErrorDTO = ErrorDTO & {
  validation: ValidationErrorData;
};

export function badRequest(
  error: ValidationError
): IHttpResponse<ValidationErrorDTO> {
  return {
    statusCode: 400,
    body: {
      code: 'validation',
      message: 'Validation error',
      validation: {
        field: error.field,
        type: error.type,
        message: error.message,
      },
    },
  };
}

export function unauthorized(error: Error): IHttpResponse<ErrorDTO> {
  return {
    statusCode: 401,
    body: toErrorDTO(error),
  };
}

export function notFound(error: Error): IHttpResponse<ErrorDTO> {
  return {
    statusCode: 404,
    body: toErrorDTO(error),
  };
}

export function conflict(error: Error): IHttpResponse<ErrorDTO> {
  return {
    statusCode: 409,
    body: toErrorDTO(error),
  };
}

export function unprocessableEntity(error: Error): IHttpResponse<ErrorDTO> {
  return {
    statusCode: 422,
    body: toErrorDTO(error),
  };
}

export function internalServerError(_: Error): IHttpResponse<ErrorDTO> {
  return {
    statusCode: 500,
    body: {
      code: 'internal',
      message: 'Internal server error',
    },
  };
}

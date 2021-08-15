import { IHttpRespose } from '../../protocols/Http';

export function created<T = any>(data?: T): IHttpRespose<T> {
  return {
    statusCode: 201,
    body: data,
  };
}

export function unprocessableEntity(error: Error): IHttpRespose<Error> {
  return {
    statusCode: 422,
    body: error,
  };
}

export function internalServerError(error: Error): IHttpRespose<Error> {
  return {
    statusCode: 500,
    body: error,
  };
}

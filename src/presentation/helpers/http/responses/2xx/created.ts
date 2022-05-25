import { IHttpResponse } from '@presentation/protocols';

export function created<T = any>(data?: T): IHttpResponse<T> {
  return {
    statusCode: 201,
    body: data,
  };
}

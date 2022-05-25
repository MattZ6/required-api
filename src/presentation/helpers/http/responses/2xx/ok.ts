import { IHttpResponse } from '@presentation/protocols';

export function ok<T = any>(data: T): IHttpResponse<T> {
  return {
    statusCode: 200,
    body: data,
  };
}

import { IHttpRequest, IHttpResponse } from '.';

export interface IMiddleware {
  handle(request: IHttpRequest): Promise<IHttpResponse>;
}

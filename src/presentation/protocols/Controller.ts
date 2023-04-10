import { IHttpRequest, IHttpResponse } from '.'

export interface IController {
  handle(request: IHttpRequest): Promise<IHttpResponse>
}

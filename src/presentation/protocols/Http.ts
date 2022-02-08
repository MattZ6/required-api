export interface IHttpResponse<B = any> {
  statusCode: number;
  body?: B;
}

export interface IHttpRequest<B = any> {
  user_id?: string;
  body?: B;
}

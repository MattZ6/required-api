export interface IError {
  exception_was_thrown_in: string;
  user_id?: string;
  resource_url: string;
  http_method: string;
  stack: string;
  created_at: Date;
}

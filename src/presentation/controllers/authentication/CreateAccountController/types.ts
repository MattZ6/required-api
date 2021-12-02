import { IHttpRequest } from '@presentation/protocols/Http';

type CreateAccountBodyRequest = {
  name: string;
  email: string;
  password: string;
};

export type CreateAccountRequest = IHttpRequest<CreateAccountBodyRequest>;

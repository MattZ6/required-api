import { IHttpRequest } from '@presentation/protocols/Http';

type AuthenticateUserBodyRequest = {
  email: string;
  password: string;
};

export type AuthenticateUserRequest = IHttpRequest<AuthenticateUserBodyRequest>;

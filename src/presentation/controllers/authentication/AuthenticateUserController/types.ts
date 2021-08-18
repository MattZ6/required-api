import { IHttpRequest } from '../../../protocols/Http';

type BodyRequest = {
  email: string;
  password: string;
};

export type AuthenticateUserRequest = IHttpRequest<BodyRequest>;

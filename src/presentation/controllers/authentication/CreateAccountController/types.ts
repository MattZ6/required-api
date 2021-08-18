import { IHttpRequest } from '@presentation/protocols/Http';

type BodyRequest = {
  name: string;
  email: string;
  password: string;
};

export type SignUpRequest = IHttpRequest<BodyRequest>;

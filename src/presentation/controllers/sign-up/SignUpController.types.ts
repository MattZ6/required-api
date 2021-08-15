import { IHttpRequest } from '../../protocols/Http';

type BodyRequest = {
  name: string;
  email: string;
  password: string;
};

export type SignUpRequest = IHttpRequest<BodyRequest>;

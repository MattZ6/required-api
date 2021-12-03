import { IHttpRequest } from '@presentation/protocols';

type UpdateProfileNameBodyRequest = {
  name: string;
};

export type UpdateProfileNameRequest =
  IHttpRequest<UpdateProfileNameBodyRequest>;

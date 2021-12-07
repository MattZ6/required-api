import { IHttpRequest } from '@presentation/protocols';

type UpdateProfileEmailBodyRequest = {
  email: string;
};

export type UpdateProfileEmailRequest =
  IHttpRequest<UpdateProfileEmailBodyRequest>;

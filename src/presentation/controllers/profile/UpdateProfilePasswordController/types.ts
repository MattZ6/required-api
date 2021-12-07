import { IHttpRequest } from '@presentation/protocols';

type UpdateProfilePasswordBodyRequest = {
  old_password: string;
  password: string;
};

export type UpdateProfilePasswordRequest =
  IHttpRequest<UpdateProfilePasswordBodyRequest>;

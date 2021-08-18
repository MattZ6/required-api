import { IUserModel } from '@domain/models/User';

export type CreateUserDTO = {
  name: string;
  email: string;
  password_hash: string;
};

export interface ICreateUserRepository {
  create(data: CreateUserDTO): Promise<IUserModel>;
}

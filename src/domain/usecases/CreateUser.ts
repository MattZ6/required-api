import { IUserModel } from '@domain/models/User';

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
};

export interface ICreateUserUseCase {
  execute(data: CreateUserDTO): Promise<IUserModel>;
}

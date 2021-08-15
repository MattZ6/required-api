import { IUserModel } from '../models/User';

export type CreateUserDTO = {
  name: string;
  email: string;
  password;
};

export interface ICreateUserUseCase {
  execute(data: CreateUserDTO): Promise<IUserModel>;
}

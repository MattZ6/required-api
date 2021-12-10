import { IUserModel } from '@domain/models/User';

import {
  CreateUserDTO,
  ICheckIfUserExistsByEmailRepository,
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@data/protocols/repositories/user';

export class CheckIfUserExistsByEmailRepositorySpy
  implements ICheckIfUserExistsByEmailRepository
{
  async checkIfExistsByEmail(_: string): Promise<boolean> {
    return false;
  }
}

export class CreateUserRepositorySpy implements ICreateUserRepository {
  async create(data: CreateUserDTO): Promise<IUserModel> {
    return {
      ...data,
      id: 'any-id',
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}

export class FindUserByEmailRepositorySpy
  implements IFindUserByEmailRepository
{
  async findByEmail(email: string): Promise<IUserModel | undefined> {
    return {
      id: 'any-id',
      name: 'John Doe',
      email,
      password_hash: 'passwordhash',
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}

export class FindUserByIdRepositorySpy implements IFindUserByIdRepository {
  async findById(id: string): Promise<IUserModel | undefined> {
    return {
      id,
      name: 'John Doe',
      email: 'john.doe@email.com',
      password_hash: 'passwordhash',
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}

export class UpdateUserRepositorySpy implements IUpdateUserRepository {
  async update(user: IUserModel): Promise<IUserModel> {
    return user;
  }
}

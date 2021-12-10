import Faker from 'faker';

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
      id: Faker.datatype.uuid(),
      created_at: Faker.datatype.datetime(),
      updated_at: Faker.datatype.datetime(),
    };
  }
}

export class FindUserByEmailRepositorySpy
  implements IFindUserByEmailRepository
{
  async findByEmail(email: string): Promise<IUserModel | undefined> {
    return {
      id: Faker.datatype.uuid(),
      name: Faker.name.findName(),
      email,
      password_hash: Faker.datatype.string(10),
      created_at: Faker.datatype.datetime(),
      updated_at: Faker.datatype.datetime(),
    };
  }
}

export class FindUserByIdRepositorySpy implements IFindUserByIdRepository {
  async findById(id: string): Promise<IUserModel | undefined> {
    return {
      id,
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      password_hash: Faker.internet.password(),
      created_at: Faker.datatype.datetime(),
      updated_at: Faker.datatype.datetime(),
    };
  }
}

export class UpdateUserRepositorySpy implements IUpdateUserRepository {
  async update(user: IUserModel): Promise<IUserModel> {
    return user;
  }
}

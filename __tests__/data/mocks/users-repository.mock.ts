import { faker } from '@faker-js/faker';

import {
  ICheckIfUserExistsByEmailRepository,
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@data/protocols/repositories/user';

export class CheckIfUserExistsByEmailRepositorySpy
  implements ICheckIfUserExistsByEmailRepository
{
  async checkIfExistsByEmail(
    _: ICheckIfUserExistsByEmailRepository.Input
  ): Promise<ICheckIfUserExistsByEmailRepository.Output> {
    return false;
  }
}

export class CreateUserRepositorySpy implements ICreateUserRepository {
  async create(
    data: ICreateUserRepository.Input
  ): Promise<ICreateUserRepository.Output> {
    return {
      ...data,
      id: faker.datatype.uuid(),
      created_at: faker.datatype.datetime(),
      updated_at: faker.datatype.datetime(),
    };
  }
}

export class FindUserByEmailRepositorySpy
  implements IFindUserByEmailRepository
{
  async findByEmail(
    data: IFindUserByEmailRepository.Input
  ): Promise<IFindUserByEmailRepository.Output> {
    const { email } = data;

    return {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email,
      password_hash: faker.datatype.string(10),
      created_at: faker.datatype.datetime(),
      updated_at: faker.datatype.datetime(),
    };
  }
}

export class FindUserByIdRepositorySpy implements IFindUserByIdRepository {
  async findById(
    data: IFindUserByIdRepository.Input
  ): Promise<IFindUserByIdRepository.Output> {
    const { id } = data;

    return {
      id,
      name: faker.name.findName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(),
      created_at: faker.datatype.datetime(),
      updated_at: faker.datatype.datetime(),
    };
  }
}

export class UpdateUserRepositorySpy implements IUpdateUserRepository {
  async update(
    data: IUpdateUserRepository.Input
  ): Promise<IUpdateUserRepository.Output> {
    return data;
  }
}

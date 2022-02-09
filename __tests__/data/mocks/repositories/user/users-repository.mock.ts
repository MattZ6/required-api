import {
  ICheckIfUserExistsByEmailRepository,
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@data/protocols/repositories/user';

import { makeUserMock } from '../../../../domain';

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
    const { name, email, password_hash } = data;

    const userMock = makeUserMock();

    Object.assign(userMock, { name, email, password_hash });

    return userMock;
  }
}

export class FindUserByEmailRepositorySpy
  implements IFindUserByEmailRepository
{
  async findByEmail(
    data: IFindUserByEmailRepository.Input
  ): Promise<IFindUserByEmailRepository.Output> {
    const { email } = data;

    const userMock = makeUserMock();

    Object.assign(userMock, { email });

    return userMock;
  }
}

export class FindUserByIdRepositorySpy implements IFindUserByIdRepository {
  async findById(
    data: IFindUserByIdRepository.Input
  ): Promise<IFindUserByIdRepository.Output> {
    const { id } = data;

    const userMock = makeUserMock();

    Object.assign(userMock, { id });

    return userMock;
  }
}

export class UpdateUserRepositorySpy implements IUpdateUserRepository {
  async update(
    data: IUpdateUserRepository.Input
  ): Promise<IUpdateUserRepository.Output> {
    return data;
  }
}

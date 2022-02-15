import { getRepository, Repository, Raw } from 'typeorm';

import {
  ICheckIfUserExistsByEmailRepository,
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@application/protocols/repositories/user';

import { User } from '@infra/database/typeorm/entities/User';

export class PostgresUsersRepository
  implements
    ICheckIfUserExistsByEmailRepository,
    ICreateUserRepository,
    IFindUserByEmailRepository,
    IFindUserByIdRepository,
    IUpdateUserRepository
{
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async checkIfExistsByEmail(
    data: ICheckIfUserExistsByEmailRepository.Input
  ): Promise<ICheckIfUserExistsByEmailRepository.Output> {
    const { email } = data;

    const count = await this.repository.count({
      where: {
        email: Raw(field => `LOWER(${field}) = LOWER(:value)`, {
          value: email,
        }),
      },
    });

    return count >= 1;
  }

  async create(
    data: ICreateUserRepository.Input
  ): Promise<ICreateUserRepository.Output> {
    const { name, email, password_hash } = data;

    const user = this.repository.create({ name, email, password_hash });

    return this.repository.save(user);
  }

  async findByEmail(
    data: IFindUserByEmailRepository.Input
  ): Promise<IFindUserByEmailRepository.Output> {
    const { email } = data;

    return this.repository.findOne({
      where: {
        email: Raw(field => `LOWER(${field}) = LOWER(:value)`, {
          value: email,
        }),
      },
    });
  }

  async findById(
    data: IFindUserByIdRepository.Input
  ): Promise<IFindUserByIdRepository.Output> {
    const { id } = data;

    return this.repository.findOne(id);
  }

  async update(
    data: IUpdateUserRepository.Input
  ): Promise<IUpdateUserRepository.Output> {
    return this.repository.save(data);
  }
}

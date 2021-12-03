import { getRepository, Repository, Raw } from 'typeorm';

import { IUserModel } from '@domain/models/User';

import {
  CreateUserDTO,
  ICheckIfUserExistsByEmail,
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@data/protocols/repositories/user';

import { User } from '@infra/database/typeorm/entities/User';

export class PostgresUsersRepository
  implements
    ICheckIfUserExistsByEmail,
    ICreateUserRepository,
    IFindUserByEmailRepository,
    IFindUserByIdRepository,
    IUpdateUserRepository
{
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async checkIfExistsByEmail(email: string): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        email: Raw(field => `LOWER(${field}) = LOWER(:value)`, {
          value: email,
        }),
      },
    });

    return count >= 1;
  }

  async create(data: CreateUserDTO): Promise<IUserModel> {
    const { name, email, password_hash } = data;

    const user = this.repository.create({ name, email, password_hash });

    return this.repository.save(user);
  }

  async findByEmail(email: string): Promise<IUserModel | undefined> {
    return this.repository.findOne({
      where: {
        email: Raw(field => `LOWER(${field}) = LOWER(:value)`, {
          value: email,
        }),
      },
    });
  }

  async findById(id: string): Promise<IUserModel | undefined> {
    return this.repository.findOne(id);
  }

  async update(user: IUserModel): Promise<IUserModel> {
    return this.repository.save(user);
  }
}

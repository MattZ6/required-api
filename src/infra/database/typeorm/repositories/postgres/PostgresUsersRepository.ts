import { getRepository, Repository, Raw } from 'typeorm';

import { ICheckIfUserExistsByEmail } from '../../../../../data/protocols/repositories/user/CheckIfUserExistsByEmail';
import {
  CreateUserDTO,
  ICreateUserRepository,
} from '../../../../../data/protocols/repositories/user/CreateUserRepository';
import { IFindUserByEmailRepository } from '../../../../../data/protocols/repositories/user/FindUserByEmailRepository';
import { IUserModel } from '../../../../../domain/models/User';
import { User } from '../../entities/User';

class PostgresUsersRepository
  implements
    ICheckIfUserExistsByEmail,
    ICreateUserRepository,
    IFindUserByEmailRepository
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
}

export default new PostgresUsersRepository();

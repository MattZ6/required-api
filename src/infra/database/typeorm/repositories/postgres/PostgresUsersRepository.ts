import { getRepository, Repository, Raw } from 'typeorm';

import { ICheckIfUserExistsByEmail } from '../../../../../data/protocols/repositories/user/CheckIfUserExistsByEmail';
import {
  CreateUserDTO,
  ICreateUserRepository,
} from '../../../../../data/protocols/repositories/user/CreateUserRepository';
import { IUserModel } from '../../../../../domain/models/User';
import { User } from '../../entities/User';

class PostgresUsersRepository
  implements ICheckIfUserExistsByEmail, ICreateUserRepository
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

  create(data: CreateUserDTO): Promise<IUserModel> {
    const { name, email, password_hash } = data;

    const user = this.repository.create({ name, email, password_hash });

    return this.repository.save(user);
  }
}

export default new PostgresUsersRepository();

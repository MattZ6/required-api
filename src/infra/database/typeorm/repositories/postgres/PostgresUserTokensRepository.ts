import { getRepository, Repository } from 'typeorm';

import {
  ICreateUserTokenRepository,
  IDeleteUserTokenByIdRepository,
  IFindUserTokenByTokenRepository,
} from '@application/protocols/repositories/user-token';

import { UserToken } from '@infra/database/typeorm/entities/UserToken';

export class PostgresUserTokensRepository
  implements
    IFindUserTokenByTokenRepository,
    ICreateUserTokenRepository,
    IDeleteUserTokenByIdRepository
{
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  findByToken(
    data: IFindUserTokenByTokenRepository.Input
  ): Promise<IFindUserTokenByTokenRepository.Output> {
    const { token } = data;

    return this.repository.findOne({ where: { token } });
  }

  create(
    data: ICreateUserTokenRepository.Input
  ): Promise<ICreateUserTokenRepository.Output> {
    const { token, user_id, expires_in } = data;

    const userToken = this.repository.create({
      token,
      user_id,
      expires_in,
    });

    return this.repository.save(userToken);
  }

  async deleteById(
    data: IDeleteUserTokenByIdRepository.Input
  ): Promise<IDeleteUserTokenByIdRepository.Output> {
    const { id } = data;

    await this.repository.delete({ id });
  }
}

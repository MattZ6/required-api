import { UserToken } from '@domain/entities/UserToken';

interface ICreateUserTokenRepository {
  create(
    data: ICreateUserTokenRepository.Input
  ): Promise<ICreateUserTokenRepository.Output>;
}

namespace ICreateUserTokenRepository {
  export type Input = Pick<UserToken, 'user_id' | 'token' | 'expires_in'>;

  export type Output = UserToken;
}

export { ICreateUserTokenRepository };

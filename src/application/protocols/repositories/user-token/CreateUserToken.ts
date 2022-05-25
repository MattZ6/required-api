import { UserToken } from '@domain/models/UserToken';

interface ICreateUserTokenRepository {
  create(
    data: ICreateUserTokenRepository.Input
  ): Promise<ICreateUserTokenRepository.Output>;
}

namespace ICreateUserTokenRepository {
  export type Input = {
    token: string;
    user_id: string;
    expires_in: Date;
  };

  export type Output = UserToken;
}

export { ICreateUserTokenRepository };

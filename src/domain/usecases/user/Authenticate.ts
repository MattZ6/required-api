import { Authentication } from '@domain/entities/Authentication';
import { User } from '@domain/entities/User';

interface IAuthenticateUserUseCase {
  execute(
    data: IAuthenticateUserUseCase.Input
  ): Promise<IAuthenticateUserUseCase.Output>;
}

namespace IAuthenticateUserUseCase {
  export type Input = Pick<User, 'email'> & {
    password: string;
  };

  export type Output = Authentication;
}

export { IAuthenticateUserUseCase };

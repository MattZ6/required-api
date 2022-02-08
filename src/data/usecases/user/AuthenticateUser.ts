import {
  PasswordNotMatchError,
  UserNotFoundWithThisEmailError,
} from '@domain/errors';
import { IAuthenticateUserUseCase } from '@domain/usecases/user/AuthenticateUser';

import { IEncryptProvider } from '@data/protocols/providers/cryptography/cryptography';
import { ICompareHashProvider } from '@data/protocols/providers/cryptography/hash';
import { IFindUserByEmailRepository } from '@data/protocols/repositories/user';

export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly compareHashProvider: ICompareHashProvider,
    private readonly encryptProvider: IEncryptProvider
  ) {}

  async execute(
    data: IAuthenticateUserUseCase.Input
  ): Promise<IAuthenticateUserUseCase.Output> {
    const { email, password } = data;

    const user = await this.findUserByEmailRepository.findByEmail({ email });

    if (!user) {
      throw new UserNotFoundWithThisEmailError();
    }

    const passwordsMatch = await this.compareHashProvider.compare({
      value: password,
      hashed_value: user.password_hash,
    });

    if (!passwordsMatch) {
      throw new PasswordNotMatchError();
    }

    const token = await this.encryptProvider.encrypt({
      value: user.id,
    });

    return { access_token: token };
  }
}

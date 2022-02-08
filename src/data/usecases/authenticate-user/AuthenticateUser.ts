import {
  PasswordNotMatchError,
  UserNotFoundWithThisEmailError,
} from '@domain/errors';
import {
  AccessTokenDTO,
  AuthenticateUserDTO,
  IAuthenticateUserUseCase,
} from '@domain/usecases/AuthenticateUser';

import { IEncryptProvider } from '@data/protocols/providers/cryptography/cryptography';
import { ICompareHashProvider } from '@data/protocols/providers/cryptography/hash';
import { IFindUserByEmailRepository } from '@data/protocols/repositories/user';

export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(
    private readonly findUserByEmailRepository: IFindUserByEmailRepository,
    private readonly compareHashProvider: ICompareHashProvider,
    private readonly encryptProvider: IEncryptProvider
  ) {}

  async execute(data: AuthenticateUserDTO): Promise<AccessTokenDTO> {
    const { email, password } = data;

    const user = await this.findUserByEmailRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundWithThisEmailError();
    }

    const passwordsMatch = await this.compareHashProvider.compare(
      password,
      user.password_hash
    );

    if (!passwordsMatch) {
      throw new PasswordNotMatchError();
    }

    const token = await this.encryptProvider.encrypt(user.id);

    return { access_token: token };
  }
}

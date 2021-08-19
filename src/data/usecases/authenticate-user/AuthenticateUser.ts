import { PasswordNotMatchError } from '@domain/error/PasswordNotMatchError';
import { UserNotFoundWithThisEmailError } from '@domain/error/UserNotFoundWithThisEmailError';
import {
  AccessTokenDTO,
  AuthenticateUserDTO,
  IAuthenticateUserUseCase,
} from '@domain/usecases/AuthenticateUser';

import { IEncryptProvider } from '@data/protocols/cryptography/criptography/EncryptProvider';
import { ICompareHashProvider } from '@data/protocols/cryptography/hash/CompareHashProvider';
import { IFindUserByEmailRepository } from '@data/protocols/repositories/user/FindUserByEmailRepository';

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

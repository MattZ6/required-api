import { AuthenticateUserUseCase } from '@data/usecases/user/AuthenticateUser';

import { AuthenticateUserController } from '@presentation/controllers/user/AuthenticateUser';
import { IController } from '@presentation/protocols/Controller';

import { makeBcryptjsHashProvider } from '@main/factories/providers/cryptography/BcryptjsHashProviderFactory';
import { makeJWTCryptographyProvider } from '@main/factories/providers/cryptography/JWTCryptographyProviderFactory';
import { makePostgresUsersRepository } from '@main/factories/repositories/PostgresUsersRepositoryFactory';

export const makeAuthenticateUserController = (): IController => {
  const usersRepository = makePostgresUsersRepository();

  const hashProvider = makeBcryptjsHashProvider();
  const cryptographyProvider = makeJWTCryptographyProvider();

  const authenticateUserUseCase = new AuthenticateUserUseCase(
    usersRepository,
    hashProvider,
    cryptographyProvider
  );

  return new AuthenticateUserController(authenticateUserUseCase);
};

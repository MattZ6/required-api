import { AuthenticateUserUseCase } from '@data/usecases/authenticate-user/AuthenticateUser';

import { AuthenticateUserController } from '@presentation/controllers/authentication/AuthenticateUserController';
import { IController } from '@presentation/protocols/Controller';

import { makeBcryptjsHashProvider } from '@main/factories/providers/cryptography/BcryptjsHashProviderFactory';
import { makeJWTCryptographyProvider } from '@main/factories/providers/cryptography/JWTCryptographyProviderFactory';
import makePostgresUsersRepository from '@main/factories/repositories/PostgresUsersRepositoryFactory';

export const makeAuthenticateUserController = (): IController => {
  const authenticateUserUseCase = new AuthenticateUserUseCase(
    makePostgresUsersRepository,
    makeBcryptjsHashProvider(),
    makeJWTCryptographyProvider()
  );

  return new AuthenticateUserController(authenticateUserUseCase);
};

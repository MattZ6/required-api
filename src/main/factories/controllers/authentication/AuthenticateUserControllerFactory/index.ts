import { AuthenticateUserUseCase } from '@data/usecases/authenticate-user/AuthenticateUser';

import PostgresUsersRepository from '@infra/database/typeorm/repositories/postgres/PostgresUsersRepository';

import { AuthenticateUserController } from '@presentation/controllers/authentication/AuthenticateUserController';
import { IController } from '@presentation/protocols/Controller';

import { makeBcryptjsHashProvider } from '@main/factories/providers/cryptography/BcryptjsHashProviderFactory';
import { makeJWTCryptographyProvider } from '@main/factories/providers/cryptography/JWTCryptographyProviderFactory';

export const makeAuthenticateUserController = (): IController => {
  const authenticateUserUseCase = new AuthenticateUserUseCase(
    PostgresUsersRepository,
    makeBcryptjsHashProvider(),
    makeJWTCryptographyProvider()
  );

  return new AuthenticateUserController(authenticateUserUseCase);
};

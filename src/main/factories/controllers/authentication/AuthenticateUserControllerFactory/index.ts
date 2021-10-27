import { AuthenticateUserUseCase } from '@data/usecases/authenticate-user/AuthenticateUser';

import PostgresUsersRepository from '@infra/database/typeorm/repositories/postgres/PostgresUsersRepository';

import { AuthenticateUserController } from '@presentation/controllers/authentication/AuthenticateUserController';
import { IController } from '@presentation/protocols/Controller';

import { makeBcryptjsHashProvider } from '@main/factories/providers/criptography/BcryptjsHashProviderFactory';
import { makeJWTCriptographyProvider } from '@main/factories/providers/criptography/JWTCriptographyProviderFactory';

export const makeAuthenticateUserController = (): IController => {
  const authenticateUserUseCase = new AuthenticateUserUseCase(
    PostgresUsersRepository,
    makeBcryptjsHashProvider(),
    makeJWTCriptographyProvider()
  );

  return new AuthenticateUserController(authenticateUserUseCase);
};

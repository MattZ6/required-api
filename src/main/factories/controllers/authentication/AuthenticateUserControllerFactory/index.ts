import { AuthenticateUserUseCase } from '@data/usecases/authenticate-user/AuthenticateUser';

import { JWTCriptographyProvider } from '@infra/criptography/criptography/JWTCriptographyProvider';
import { BcryptHashProvider } from '@infra/criptography/hash/BcryptHashProvider';
import PostgresUsersRepository from '@infra/database/typeorm/repositories/postgres/PostgresUsersRepository';

import { AuthenticateUserController } from '@presentation/controllers/authentication/AuthenticateUserController';
import { IController } from '@presentation/protocols/Controller';

export const makeAuthenticateUserController = (): IController => {
  const bcryptHashProvider = new BcryptHashProvider(12);
  const jwtCriptographyProvider = new JWTCriptographyProvider(
    process.env.AUTH_SECRET,
    '15m'
  );

  const authenticateUserUseCase = new AuthenticateUserUseCase(
    PostgresUsersRepository,
    bcryptHashProvider,
    jwtCriptographyProvider
  );

  return new AuthenticateUserController(authenticateUserUseCase);
};

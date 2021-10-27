import { CreateUseUseCase } from '@data/usecases/create-user/CreateUser';

import PostgresUsersRepository from '@infra/database/typeorm/repositories/postgres/PostgresUsersRepository';

import { CreateAccountController } from '@presentation/controllers/authentication/CreateAccountController';
import { IController } from '@presentation/protocols/Controller';

import { makeBcryptjsHashProvider } from '@main/factories/providers/cryptography/BcryptjsHashProviderFactory';

export const makeCreateAccountController = (): IController => {
  const createUserUseCase = new CreateUseUseCase(
    PostgresUsersRepository,
    makeBcryptjsHashProvider(),
    PostgresUsersRepository
  );

  return new CreateAccountController(createUserUseCase);
};

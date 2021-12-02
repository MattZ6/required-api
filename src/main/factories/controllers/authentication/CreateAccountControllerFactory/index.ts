import { CreateUseUseCase } from '@data/usecases/create-user/CreateUser';

import { CreateAccountController } from '@presentation/controllers/authentication/CreateAccountController';
import { IController } from '@presentation/protocols/Controller';

import { makeBcryptjsHashProvider } from '@main/factories/providers/cryptography/BcryptjsHashProviderFactory';
import makePostgresUsersRepository from '@main/factories/repositories/PostgresUsersRepositoryFactory';

export const makeCreateAccountController = (): IController => {
  const createUserUseCase = new CreateUseUseCase(
    makePostgresUsersRepository,
    makeBcryptjsHashProvider(),
    makePostgresUsersRepository
  );

  return new CreateAccountController(createUserUseCase);
};

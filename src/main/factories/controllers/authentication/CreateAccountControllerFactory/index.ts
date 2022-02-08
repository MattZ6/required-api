import { CreateUserUseCase } from '@data/usecases/user/CreateUser';

import { CreateAccountController } from '@presentation/controllers/user/CreateAccount';
import { IController } from '@presentation/protocols/Controller';

import { makeBcryptjsHashProvider } from '@main/factories/providers/cryptography/BcryptjsHashProviderFactory';
import { makePostgresUsersRepository } from '@main/factories/repositories/PostgresUsersRepositoryFactory';

export const makeCreateAccountController = (): IController => {
  const usersRepository = makePostgresUsersRepository();

  const createUserUseCase = new CreateUserUseCase(
    usersRepository,
    makeBcryptjsHashProvider(),
    usersRepository
  );

  return new CreateAccountController(createUserUseCase);
};

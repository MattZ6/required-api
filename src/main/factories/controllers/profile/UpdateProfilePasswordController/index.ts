import { UpdateUserPasswordUseCase } from '@data/usecases/user/UpdateUserPassword';

import { UpdateProfilePasswordController } from '@presentation/controllers/user/UpdateProfilePassword';
import { IController } from '@presentation/protocols/Controller';

import { makeBcryptjsHashProvider } from '@main/factories/providers/cryptography/BcryptjsHashProviderFactory';
import { makePostgresUsersRepository } from '@main/factories/repositories/PostgresUsersRepositoryFactory';

export const makeUpdateProfilePasswordController = (): IController => {
  const usersRepository = makePostgresUsersRepository();

  const hashProvider = makeBcryptjsHashProvider();

  const updateUserPasswordUseCase = new UpdateUserPasswordUseCase(
    usersRepository,
    hashProvider,
    hashProvider,
    usersRepository
  );

  return new UpdateProfilePasswordController(updateUserPasswordUseCase);
};

import { UpdateUserPasswordUseCase } from '@data/usecases/update-user-password/UpdateUserPassword';

import { UpdateProfilePasswordController } from '@presentation/controllers/profile/UpdateProfilePasswordController';
import { IController } from '@presentation/protocols/Controller';

import { makeBcryptjsHashProvider } from '@main/factories/providers/cryptography/BcryptjsHashProviderFactory';
import makePostgresUsersRepository from '@main/factories/repositories/PostgresUsersRepositoryFactory';

export const makeUpdateProfilePasswordController = (): IController => {
  const hashProvider = makeBcryptjsHashProvider();

  const updateUserPasswordUseCase = new UpdateUserPasswordUseCase(
    makePostgresUsersRepository,
    hashProvider,
    hashProvider,
    makePostgresUsersRepository
  );

  return new UpdateProfilePasswordController(updateUserPasswordUseCase);
};

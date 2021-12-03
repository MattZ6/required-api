import { UpdateUserNameUseCase } from '@data/usecases/update-user-name/UpdateUserName';

import { UpdateProfileNameController } from '@presentation/controllers/profile/UpdateProfileNameController';
import { IController } from '@presentation/protocols/Controller';

import makePostgresUsersRepository from '@main/factories/repositories/PostgresUsersRepositoryFactory';

export const makeUpdateProfileNameController = (): IController => {
  const updateProfileNameUseCase = new UpdateUserNameUseCase(
    makePostgresUsersRepository,
    makePostgresUsersRepository
  );

  return new UpdateProfileNameController(updateProfileNameUseCase);
};

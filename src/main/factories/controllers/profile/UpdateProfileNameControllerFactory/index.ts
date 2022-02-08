import { UpdateUserNameUseCase } from '@data/usecases/user/UpdateUserName';

import { UpdateProfileNameController } from '@presentation/controllers/user/UpdateProfileName';
import { IController } from '@presentation/protocols/Controller';

import { makePostgresUsersRepository } from '@main/factories/repositories/PostgresUsersRepositoryFactory';

export const makeUpdateProfileNameController = (): IController => {
  const usersRepository = makePostgresUsersRepository();

  const updateProfileNameUseCase = new UpdateUserNameUseCase(
    usersRepository,
    usersRepository
  );

  return new UpdateProfileNameController(updateProfileNameUseCase);
};

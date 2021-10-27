import { GetProfileUseCase } from '@data/usecases/get-profile/GetProfile';

import PostgresUsersRepository from '@infra/database/typeorm/repositories/postgres/PostgresUsersRepository';

import { GetProfileController } from '@presentation/controllers/profile/GetProfileController';
import { IController } from '@presentation/protocols/Controller';

export const makeGetProfileController = (): IController => {
  const getProfileUseCase = new GetProfileUseCase(PostgresUsersRepository);

  return new GetProfileController(getProfileUseCase);
};

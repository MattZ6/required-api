import { GetProfileController } from '@presentation/controllers/user/GetProfile';
import { IController } from '@presentation/protocols/Controller';

import { makeGetProfileUseCase } from '@main/factories/usecases/user/GetProfileUseCaseFactory';

export function makeGetProfileController(): IController {
  const getProfileUseCase = makeGetProfileUseCase();

  return new GetProfileController(getProfileUseCase);
}

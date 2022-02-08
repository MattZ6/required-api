import { UpdateProfileNameController } from '@presentation/controllers/user/UpdateProfileName';
import { IController } from '@presentation/protocols/Controller';

import { makeUpdateUserNameUseCase } from '@main/factories/usecases/user/UpdateUserNameUseCaseFactory';

export function makeUpdateProfileNameController(): IController {
  const updateProfileNameUseCase = makeUpdateUserNameUseCase();

  return new UpdateProfileNameController(updateProfileNameUseCase);
}

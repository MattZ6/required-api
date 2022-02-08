import { UpdateProfilePasswordController } from '@presentation/controllers/user/UpdateProfilePassword';
import { IController } from '@presentation/protocols/Controller';

import { makeUpdateUserPasswordUseCase } from '@main/factories/usecases/user/UpdateUserPasswordUseCaseFactory';

export function makeUpdateProfilePasswordController(): IController {
  const updateUserPasswordUseCase = makeUpdateUserPasswordUseCase();

  return new UpdateProfilePasswordController(updateUserPasswordUseCase);
}

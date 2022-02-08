import { UpdateProfileEmailController } from '@presentation/controllers/user/UpdateProfileEmail';
import { IController } from '@presentation/protocols/Controller';

import { makeUpdateUserEmailUseCase } from '@main/factories/usecases/user/UpdateUserEmailUseCaseFactory';

export function makeUpdateProfileEmailController(): IController {
  const updateUserEmailUseCase = makeUpdateUserEmailUseCase();

  return new UpdateProfileEmailController(updateUserEmailUseCase);
}

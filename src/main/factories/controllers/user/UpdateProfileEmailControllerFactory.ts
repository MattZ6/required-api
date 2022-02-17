import { UpdateProfileEmailController } from '@presentation/controllers/user/UpdateProfileEmail';
import { IController } from '@presentation/protocols/Controller';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory';
import { makeUpdateUserEmailUseCase } from '@main/factories/usecases/user/UpdateUserEmailUseCaseFactory';

export function makeUpdateProfileEmailController(): IController {
  const updateUserEmailUseCase = makeUpdateUserEmailUseCase();

  const controller = new UpdateProfileEmailController(updateUserEmailUseCase);

  return makeControllerErrorHandlerDecorator(controller);
}

import { UpdateProfileEmailController } from '@presentation/controllers/user/UpdateProfileEmail';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory';
import { makeUpdateUserEmailUseCase } from '@main/factories/usecases/user/UpdateEmail';
import { makeUpdateProfileEmailControllerValidation } from '@main/factories/validators/controllers/user/UpdateProfileEmail';

export function makeUpdateProfileEmailController(): IController {
  const validation = makeUpdateProfileEmailControllerValidation();

  const updateUserEmailUseCase = makeUpdateUserEmailUseCase();

  const controller = new UpdateProfileEmailController(
    validation,
    updateUserEmailUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}

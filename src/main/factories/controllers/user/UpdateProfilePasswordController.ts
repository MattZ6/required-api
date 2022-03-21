import { UpdateProfilePasswordController } from '@presentation/controllers/user/UpdateProfilePassword';
import { IController } from '@presentation/protocols/Controller';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory';
import { makeUpdateUserPasswordUseCase } from '@main/factories/usecases/user/UpdateUserPasswordUseCaseFactory';
import { makeUpdateProfilePasswordControllerValidation } from '@main/factories/validators/controllers/user/UpdateProfilePasswordControllerValidationFactory';

export function makeUpdateProfilePasswordController(): IController {
  const validation = makeUpdateProfilePasswordControllerValidation();

  const updateUserPasswordUseCase = makeUpdateUserPasswordUseCase();

  const controller = new UpdateProfilePasswordController(
    validation,
    updateUserPasswordUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}

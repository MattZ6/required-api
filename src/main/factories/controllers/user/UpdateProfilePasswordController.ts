import { UpdateProfilePasswordController } from '@presentation/controllers/user/UpdateProfilePassword';
import { IController } from '@presentation/protocols/Controller';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory';
import { makeUpdateUserPasswordUseCase } from '@main/factories/usecases/user/UpdateUserPasswordUseCaseFactory';

export function makeUpdateProfilePasswordController(): IController {
  const updateUserPasswordUseCase = makeUpdateUserPasswordUseCase();

  const controller = new UpdateProfilePasswordController(
    updateUserPasswordUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}

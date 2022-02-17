import { UpdateProfileNameController } from '@presentation/controllers/user/UpdateProfileName';
import { IController } from '@presentation/protocols/Controller';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory';
import { makeUpdateUserNameUseCase } from '@main/factories/usecases/user/UpdateUserNameUseCaseFactory';

export function makeUpdateProfileNameController(): IController {
  const updateProfileNameUseCase = makeUpdateUserNameUseCase();

  const controller = new UpdateProfileNameController(updateProfileNameUseCase);

  return makeControllerErrorHandlerDecorator(controller);
}

import { UpdateProfileNameController } from '@presentation/controllers/user/UpdateProfileName';
import { IController } from '@presentation/protocols/Controller';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory';
import { makeUpdateUserNameUseCase } from '@main/factories/usecases/user/UpdateUserNameUseCaseFactory';
import { makeUpdateProfileNameControllerValidation } from '@main/factories/validators/controllers/user/UpdateProfileNameControllerValidationFactory';

export function makeUpdateProfileNameController(): IController {
  const validation = makeUpdateProfileNameControllerValidation();

  const updateProfileNameUseCase = makeUpdateUserNameUseCase();

  const controller = new UpdateProfileNameController(
    validation,
    updateProfileNameUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}

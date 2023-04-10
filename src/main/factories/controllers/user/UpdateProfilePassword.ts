import { UpdateProfilePasswordController } from '@presentation/controllers/user/UpdateProfilePassword'
import { IController } from '@presentation/protocols'

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory'
import { makeUpdateUserPasswordUseCase } from '@main/factories/usecases/user/UpdatePassword'
import { makeUpdateProfilePasswordControllerValidation } from '@main/factories/validators/controllers/user/UpdateProfilePassword'

export function makeUpdateProfilePasswordController(): IController {
  const validation = makeUpdateProfilePasswordControllerValidation()

  const updateUserPasswordUseCase = makeUpdateUserPasswordUseCase()

  const controller = new UpdateProfilePasswordController(
    validation,
    updateUserPasswordUseCase,
  )

  return makeControllerErrorHandlerDecorator(controller)
}

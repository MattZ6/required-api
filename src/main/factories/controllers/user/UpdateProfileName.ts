import { UpdateProfileNameController } from '@presentation/controllers/user/UpdateProfileName'
import { IController } from '@presentation/protocols'

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory'
import { makeUpdateUserNameUseCase } from '@main/factories/usecases/user/UpdateName'
import { makeUpdateProfileNameControllerValidation } from '@main/factories/validators/controllers/user/UpdateProfileName'

export function makeUpdateProfileNameController(): IController {
  const validation = makeUpdateProfileNameControllerValidation()

  const updateProfileNameUseCase = makeUpdateUserNameUseCase()

  const controller = new UpdateProfileNameController(
    validation,
    updateProfileNameUseCase,
  )

  return makeControllerErrorHandlerDecorator(controller)
}

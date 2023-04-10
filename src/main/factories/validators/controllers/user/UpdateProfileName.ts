import { UpdateProfileNameController } from '@presentation/controllers/user/UpdateProfileName'
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators'

import { userConfig } from '@main/config/env/user'

export function makeUpdateProfileNameControllerValidation() {
  type Input = UpdateProfileNameController.RequestBody

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', userConfig.NAME_MIN_LENGTH, true),
  ])
}

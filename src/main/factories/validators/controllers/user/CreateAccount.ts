import { CreateAccountController } from '@presentation/controllers/user/CreateAccount'
import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
  CompareFieldsValidation,
} from '@presentation/validations/validators'

import { userConfig } from '@main/config/env/user'

import { makeEmailFieldValidation } from '../../validators/EmailField'

export function makeCreateAccountControllerValidation(): ValidationComposite {
  type Input = CreateAccountController.RequestBody & {
    password_confirmation: string
  }

  return new ValidationComposite<Input>([
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', userConfig.NAME_MIN_LENGTH, true),
    new RequiredFieldValidation('email'),
    makeEmailFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new MinLengthFieldValidation('password', userConfig.PASSWORD_MIN_LENGTH),
    new RequiredFieldValidation('password_confirmation'),
    new MinLengthFieldValidation(
      'password_confirmation',
      userConfig.PASSWORD_MIN_LENGTH,
    ),
    new CompareFieldsValidation('password_confirmation', 'password'),
  ])
}

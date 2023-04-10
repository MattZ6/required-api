import { IEmailValidator } from '@presentation/validations/protocols'

import { JoiEmailValidatorAdapter } from '@main/adapters/joi/EmailValidator'

export function makeEmailValidator(): IEmailValidator {
  return new JoiEmailValidatorAdapter()
}

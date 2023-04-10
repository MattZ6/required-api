import { EmailFieldValidation } from '@presentation/validations/validators'

import { makeEmailValidator } from '@main/factories/adapters/EmailValidator'

export function makeEmailFieldValidation<I>(fieldName: keyof I) {
  const emailValidator = makeEmailValidator()

  return new EmailFieldValidation<I>(emailValidator, fieldName)
}

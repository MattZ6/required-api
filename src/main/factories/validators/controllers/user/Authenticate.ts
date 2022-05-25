import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
  EmailFieldValidation,
} from '@presentation/validations/validators';

import { makeEmailValidator } from '@main/factories/adapters/EmailValidator';

export function makeAuthenticateUserControllerValidation(): ValidationComposite {
  const emailValidator = makeEmailValidator();

  return new ValidationComposite([
    new RequiredFieldValidation('email'),
    new EmailFieldValidation(emailValidator, 'email'),
    new RequiredFieldValidation('password'),
    new MinLengthFieldValidation('password', 6),
  ]);
}

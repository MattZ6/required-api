import {
  MinLengthFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
  EmailFieldValidation,
  CompareFieldsValidation,
} from '@presentation/validations/validators';

import { makeEmailValidator } from '@main/factories/adapters/EmailValidator';

export function makeCreateAccountControllerValidation(): ValidationComposite {
  const emailValidator = makeEmailValidator();

  return new ValidationComposite([
    new RequiredFieldValidation('name'),
    new MinLengthFieldValidation('name', 3, true),
    new RequiredFieldValidation('email'),
    new EmailFieldValidation(emailValidator, 'email'),
    new RequiredFieldValidation('password'),
    new MinLengthFieldValidation('password', 6),
    new RequiredFieldValidation('password_confirmation'),
    new MinLengthFieldValidation('password_confirmation', 6),
    new CompareFieldsValidation('password_confirmation', 'password'),
  ]);
}

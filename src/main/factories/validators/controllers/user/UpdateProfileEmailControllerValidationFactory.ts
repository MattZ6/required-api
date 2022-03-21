import {
  EmailFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@presentation/validations/validators';

import { makeEmailValidator } from '@main/factories/adapters/EmailValidator';

export function makeUpdateProfileEmailControllerValidation() {
  const emailValidator = makeEmailValidator();

  return new ValidationComposite([
    new RequiredFieldValidation('email'),
    new EmailFieldValidation(emailValidator, 'email'),
  ]);
}

import { IEmailValidator } from '@presentation/validations/protocols';

import { JoiEmailValidatorAdapter } from '@main/adapters/joi/EmailValidatorAdapter';

export function makeEmailValidator(): IEmailValidator {
  return new JoiEmailValidatorAdapter();
}

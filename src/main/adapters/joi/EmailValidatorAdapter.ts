import Joi from 'joi';

import { IEmailValidator } from '@presentation/validations/protocols';

export class JoiEmailValidatorAdapter implements IEmailValidator {
  isValid(email: string): boolean {
    const schema = Joi.string().email();

    const result = schema.validate(email);

    return !result.error;
  }
}

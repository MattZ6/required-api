import Joi from 'joi'

import { IEmailValidator } from '@presentation/validations/protocols'

export class JoiEmailValidatorAdapter implements IEmailValidator {
  isValid(data: IEmailValidator.Input): IEmailValidator.Output {
    const { email } = data

    const schema = Joi.string().email()

    const result = schema.validate(email)

    return !result.error
  }
}

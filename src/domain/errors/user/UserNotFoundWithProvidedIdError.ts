import { DomainError } from '@domain/errors'

export class UserNotFoundWithProvidedIdError extends DomainError {
  constructor(message = 'User not exists', code = 'user.not.exists') {
    super(message, code)
  }
}

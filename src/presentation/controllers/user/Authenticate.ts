import {
  UserNotFoundWithProvidedEmailError,
  WrongPasswordError,
} from '@domain/errors'
import { IAuthenticateUserUseCase } from '@domain/usecases/user/Authenticate'

import { AuthenticationMapper } from '@presentation/dtos'
import {
  ok,
  badRequest,
  notFound,
  unprocessableEntity,
} from '@presentation/helpers/http'
import {
  IController,
  IValidation,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols'
import { ValidationError } from '@presentation/validations/errors'

class AuthenticateUserController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase,
  ) {}

  async handle(
    request: AuthenticateUserController.Request,
  ): Promise<AuthenticateUserController.Response> {
    try {
      const validationError = this.validation.validate(request.body)

      if (validationError) {
        throw validationError
      }

      const { email, password } = request.body

      const output = await this.authenticateUserUseCase.execute({
        email,
        password,
      })

      return ok(AuthenticationMapper.toDTO(output))
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error)
      }

      if (error instanceof UserNotFoundWithProvidedEmailError) {
        return notFound(error)
      }

      if (error instanceof WrongPasswordError) {
        return unprocessableEntity(error)
      }

      throw error
    }
  }
}

namespace AuthenticateUserController {
  export type RequestBody = IAuthenticateUserUseCase.Input

  export type Request = IHttpRequest<RequestBody, void, void, void>

  export type Response = IHttpResponse
}

export { AuthenticateUserController }

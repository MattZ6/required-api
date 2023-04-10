import { UserAlreadyExistsWithProvidedEmailError } from '@domain/errors'
import { ICreateUserUseCase } from '@domain/usecases/user/Create'

import { created, badRequest, conflict } from '@presentation/helpers/http'
import {
  IController,
  IValidation,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols'
import { ValidationError } from '@presentation/validations/errors'

class CreateAccountController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly createUserUseCase: ICreateUserUseCase,
  ) {}

  async handle(
    request: CreateAccountController.Request,
  ): Promise<CreateAccountController.Response> {
    try {
      const validationError = this.validation.validate(request.body)

      if (validationError) {
        throw validationError
      }

      const { name, email, password } = request.body

      await this.createUserUseCase.execute({
        name,
        email,
        password,
      })

      return created<void>()
    } catch (error) {
      if (error instanceof ValidationError) {
        return badRequest(error)
      }

      if (error instanceof UserAlreadyExistsWithProvidedEmailError) {
        return conflict(error)
      }

      throw error
    }
  }
}

namespace CreateAccountController {
  export type RequestBody = ICreateUserUseCase.Input

  export type Request = IHttpRequest<RequestBody, void, void, void>

  export type Response = IHttpResponse
}

export { CreateAccountController }

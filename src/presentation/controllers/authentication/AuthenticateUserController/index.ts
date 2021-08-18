import { PasswordNotMatchError } from '../../../../domain/error/PasswordNotMatchError';
import { UserNotFoundWithThisEmailError } from '../../../../domain/error/UserNotFoundWithThisEmail';
import { IAuthenticateUserUseCase } from '../../../../domain/usecases/AuthenticateUser';
import { notFound, ok, unprocessableEntity } from '../../../helpers/http/http';
import { IController } from '../../../protocols/Controller';
import { IHttpRespose } from '../../../protocols/Http';
import { AuthenticateUserRequest } from './types';

export class AuthenticateUserController implements IController {
  constructor(
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase
  ) {}

  async handle(request: AuthenticateUserRequest): Promise<IHttpRespose> {
    try {
      const { email, password } = request.body;

      const response = await this.authenticateUserUseCase.execute({
        email,
        password,
      });

      return ok(response);
    } catch (error) {
      if (error instanceof UserNotFoundWithThisEmailError) {
        return notFound(error);
      }

      if (error instanceof PasswordNotMatchError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}

import {
  PasswordNotMatchError,
  UserNotFoundWithThisIdError,
} from '@domain/errors';
import { IUpdateUserPasswordUseCase } from '@domain/usecases/user/UpdateUserPassword';

import {
  noContent,
  notFound,
  unprocessableEntity,
} from '@presentation/helpers/http/http';
import { IController, IHttpRespose } from '@presentation/protocols';

import { UpdateProfilePasswordRequest } from './types';

export class UpdateProfilePasswordController implements IController {
  constructor(
    private readonly updateUserPasswordUseCase: IUpdateUserPasswordUseCase
  ) {}

  async handle(request: UpdateProfilePasswordRequest): Promise<IHttpRespose> {
    const { user_id } = request;
    const { old_password, password } = request.body;

    try {
      await this.updateUserPasswordUseCase.execute({
        user_id,
        old_password,
        new_password: password,
      });

      return noContent();
    } catch (error) {
      if (error instanceof UserNotFoundWithThisIdError) {
        return notFound(error);
      }

      if (error instanceof PasswordNotMatchError) {
        return unprocessableEntity(error);
      }

      throw error;
    }
  }
}

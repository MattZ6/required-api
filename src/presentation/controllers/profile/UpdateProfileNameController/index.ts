import { UserNotFoundWithThisIdError } from '@domain/errors';
import { IUpdateUserNameUseCase } from '@domain/usecases/user/UpdateUserName';

import { noContent, notFound } from '@presentation/helpers/http/http';
import { IController, IHttpRespose } from '@presentation/protocols';

import { UpdateProfileNameRequest } from './types';

export class UpdateProfileNameController implements IController {
  constructor(private readonly updateUserNameUseCase: IUpdateUserNameUseCase) {}

  async handle(request: UpdateProfileNameRequest): Promise<IHttpRespose> {
    const { user_id } = request;
    const { name } = request.body;

    try {
      await this.updateUserNameUseCase.execute({ user_id, name });

      return noContent();
    } catch (error) {
      if (error instanceof UserNotFoundWithThisIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

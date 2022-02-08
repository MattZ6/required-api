import { UserNotFoundWithThisIdError } from '@domain/errors';
import { IGetProfileUseCase } from '@domain/usecases/user/GetProfile';

import { notFound, ok } from '@presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpRespose,
} from '@presentation/protocols';

import { toProfileDTO } from './types';

export class GetProfileController implements IController {
  constructor(private readonly getProfileUseCase: IGetProfileUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpRespose> {
    try {
      const { user_id } = request;

      const user = await this.getProfileUseCase.execute({ user_id });

      const profile = toProfileDTO(user);

      return ok(profile);
    } catch (error) {
      if (error instanceof UserNotFoundWithThisIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

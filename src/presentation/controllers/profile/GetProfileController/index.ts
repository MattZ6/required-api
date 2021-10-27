import { UserNotFoundWithThisIdError } from '@domain/errors/UserNotFoundWithThisIdError';
import { IGetProfileUseCase } from '@domain/usecases/GetProfile';

import { notFound, ok } from '@presentation/helpers/http/http';
import { IController } from '@presentation/protocols/Controller';
import { IHttpRequest, IHttpRespose } from '@presentation/protocols/Http';

import { toProfileDTO } from './types';

export class GetProfileController implements IController {
  constructor(private readonly getProfileUseCase: IGetProfileUseCase) {}

  async handle(request: IHttpRequest): Promise<IHttpRespose> {
    try {
      const { user_id } = request;

      const profile = await this.getProfileUseCase.execute({ user_id });

      return ok(toProfileDTO(profile));
    } catch (error) {
      if (error instanceof UserNotFoundWithThisIdError) {
        return notFound(error);
      }

      throw error;
    }
  }
}

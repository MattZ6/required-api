import { ISaveErrorRepository } from '@application/protocols/repositories/error';

import { internalServerError } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

export class ControllerErrorHandlerDecorator implements IController {
  constructor(
    private readonly controller: IController,
    private readonly saveErrorRepository: ISaveErrorRepository
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const response = await this.controller.handle(request);

      return response;
    } catch (error) {
      this.saveErrorRepository
        .save({
          stack: error?.stack ?? 'NO STACK PROVIDED',
          exception_was_thrown_in: this.controller.constructor.name,
          resource_url: request.original_url,
          http_method: request.method,
          user_id: request.user_id,
        })
        .then(() => console.log('Error successfully registered'))
        .catch(() => console.log('Fail to register the error'));

      return internalServerError(error);
    }
  }
}

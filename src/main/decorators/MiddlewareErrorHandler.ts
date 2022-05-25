import { ISaveErrorRepository } from '@application/protocols/repositories/error';

import { internalServerError } from '@presentation/helpers/http';
import {
  IHttpRequest,
  IHttpResponse,
  IMiddleware,
} from '@presentation/protocols';

export class MiddlewareErrorHandlerDecorator implements IMiddleware {
  constructor(
    private readonly middleware: IMiddleware,
    private readonly saveErrorRepository: ISaveErrorRepository
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const response = await this.middleware.handle(request);

      return response;
    } catch (error) {
      this.saveErrorRepository
        .save({
          stack: error?.stack ?? 'NO STACK PROVIDED',
          exception_was_thrown_in: this.middleware.constructor.name,
          resource_url: request.original_url,
          http_method: request.method,
          user_id: request.user?.id,
        })
        .then(() => console.log('Error successfully registered'))
        .catch(() => console.log('Fail to register the error'));

      return internalServerError(error);
    }
  }
}

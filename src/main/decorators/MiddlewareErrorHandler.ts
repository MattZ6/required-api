import { ICreateErrorRepository } from '@application/protocols/repositories/error';

import { internalServerError } from '@presentation/helpers/http';
import {
  IHttpRequest,
  IHttpResponse,
  IMiddleware,
} from '@presentation/protocols';

export class MiddlewareErrorHandlerDecorator implements IMiddleware {
  constructor(
    private readonly middleware: IMiddleware,
    private readonly createErrorRepository: ICreateErrorRepository,
    private readonly mustLog: boolean
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const response = await this.middleware.handle(request);

      return response;
    } catch (error) {
      this.createErrorRepository
        .create({
          stack: error?.stack ?? 'NO STACK PROVIDED',
          exception_was_thrown_in: this.middleware.constructor.name,
          resource_url: request.original_url,
          http_method: request.method,
          user_id: request.user?.id,
        })
        .then(() => {
          if (this.mustLog) {
            console.log('Error successfully registered');
          }
        })
        .catch(() => {
          if (this.mustLog) {
            console.log('Fail to register the error');
          }
        });

      return internalServerError(error);
    }
  }
}

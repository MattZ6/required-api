import { IMiddleware } from '@presentation/protocols';

import { MiddlewareErrorHandlerDecorator } from '@main/decorators/MiddlewareErrorHandler';

import { makePostgresErrorsRepository } from '../repositories/error/PostgresErrorsRepositoryFactory';

export function makeMiddlewareErrorHandlerDecorator(middleware: IMiddleware) {
  const errorsRepository = makePostgresErrorsRepository();

  return new MiddlewareErrorHandlerDecorator(middleware, errorsRepository);
}

import { IController } from '@presentation/protocols';

import { ControllerErrorHandlerDecorator } from '@main/decorators/ControllerErrorHandler';

import { makePostgresErrorsRepository } from '../repositories/error/PostgresErrorsRepositoryFactory';

export function makeControllerErrorHandlerDecorator(controller: IController) {
  const errorsRepository = makePostgresErrorsRepository();

  return new ControllerErrorHandlerDecorator(controller, errorsRepository);
}

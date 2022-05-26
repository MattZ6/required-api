import { HealthCheckController } from '@presentation/controllers/HealthCheck';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandlerDecoratorFactory';

export function makeHealthCheckController(): IController {
  const controller = new HealthCheckController();

  return makeControllerErrorHandlerDecorator(controller);
}

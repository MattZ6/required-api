import { noContent } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from '@presentation/protocols';

class HealthCheckController implements IController {
  async handle(
    _: HealthCheckController.Request
  ): Promise<HealthCheckController.Response> {
    return noContent();
  }
}

namespace HealthCheckController {
  export type Request = IHttpRequest<void, void, void, void>;

  export type Response = IHttpResponse;
}

export { HealthCheckController };

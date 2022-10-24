import { faker } from '@faker-js/faker';

import { AuthenticateUserController } from '@presentation/controllers/user/Authenticate';

export function makeAuthenticateUserControllerRequestMock(): AuthenticateUserController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    body: {
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
    headers: undefined,
    params: undefined,
    query: undefined,
  };
}

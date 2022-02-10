import faker from '@faker-js/faker';

import { AuthenticateUserController } from '@presentation/controllers/user/AuthenticateUser';

export function makeAuthenticateUserControllerRequestMock(): AuthenticateUserController.Request {
  return {
    body: {
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  };
}

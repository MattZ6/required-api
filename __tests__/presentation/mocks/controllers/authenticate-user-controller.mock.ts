import faker from '@faker-js/faker';

import { AuthenticateUserController } from '@presentation/controllers/user/AuthenticateUser';

export function makeAuthenticateUserControllerRequestMock(): AuthenticateUserController.Request {
  return {
    method: '',
    original_url: '',
    body: {
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  };
}

import { faker } from '@faker-js/faker';

import { CreateAccountController } from '@presentation/controllers/user/CreateAccount';

export function makeCreateAccountControllerRequestMock(): CreateAccountController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    body: {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
    headers: undefined,
    params: undefined,
    query: undefined,
  };
}

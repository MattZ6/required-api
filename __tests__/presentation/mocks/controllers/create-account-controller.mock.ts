import faker from '@faker-js/faker';

import { CreateAccountController } from '@presentation/controllers/user/CreateAccount';

export function makeCreateAccountControllerRequestMock(): CreateAccountController.Request {
  return {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  };
}

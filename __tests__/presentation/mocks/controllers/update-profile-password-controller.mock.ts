import faker from '@faker-js/faker';

import { UpdateProfilePasswordController } from '@presentation/controllers/user/UpdateProfilePassword';

export function makeUpdateProfilePasswordControllerRequestMock(): UpdateProfilePasswordController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    user_id: faker.datatype.uuid(),
    body: {
      old_password: faker.internet.password(),
      password: faker.internet.password(),
    },
  };
}

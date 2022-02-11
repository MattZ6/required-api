import faker from '@faker-js/faker';

import { UpdateProfilePasswordController } from '@presentation/controllers/user/UpdateProfilePassword';

export function makeUpdateProfilePasswordControllerRequestMock(): UpdateProfilePasswordController.Request {
  return {
    user_id: faker.datatype.uuid(),
    body: {
      old_password: faker.internet.password(),
      password: faker.internet.password(),
    },
  };
}

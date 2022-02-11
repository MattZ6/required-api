import faker from '@faker-js/faker';

import { UpdateProfileNameController } from '@presentation/controllers/user/UpdateProfileName';

export function makeUpdateProfileNameControllerRequestMock(): UpdateProfileNameController.Request {
  return {
    user_id: faker.datatype.uuid(),
    body: {
      name: faker.name.findName(),
    },
  };
}

import faker from '@faker-js/faker';

import { User } from '@domain/entities/User';

export function makeUserMock(): User {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password_hash: faker.internet.password(),
    created_at: faker.datatype.datetime(),
    updated_at: faker.datatype.datetime(),
  };
}

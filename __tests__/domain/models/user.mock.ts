import faker from '@faker-js/faker';

import { IUser } from '@domain/models/User';

export function makeUserMock(): IUser {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password_hash: faker.internet.password(),
    created_at: faker.datatype.datetime(),
    updated_at: faker.datatype.datetime(),
  };
}

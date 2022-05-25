import faker from '@faker-js/faker';

import { Error } from '@domain/entities/Error';

export function makeErrorEntityMock(): Error {
  return {
    user_id: faker.datatype.uuid(),
    stack: faker.datatype.string(),
    http_method: faker.internet.httpMethod(),
    exception_was_thrown_in: faker.datatype.string(),
    resource_url: faker.internet.url(),
    created_at: faker.datatype.datetime(),
  };
}

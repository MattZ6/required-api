import { faker } from '@faker-js/faker';

import { IError } from '@domain/models/Error';

export function makeErrorEntityMock(): IError {
  return {
    user_id: faker.datatype.uuid(),
    stack: faker.datatype.string(),
    http_method: faker.internet.httpMethod(),
    exception_was_thrown_in: faker.datatype.string(),
    resource_url: faker.internet.url(),
    created_at: faker.datatype.datetime(),
  };
}

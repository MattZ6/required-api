import { PostgresErrorsRepository } from '@infra/database/typeorm/repositories/postgres/PostgresErrorsRepository';

let postgresErrorsRepository: PostgresErrorsRepository;

export function makeErrorsRepository() {
  if (!postgresErrorsRepository) {
    postgresErrorsRepository = new PostgresErrorsRepository();
  }

  return postgresErrorsRepository;
}

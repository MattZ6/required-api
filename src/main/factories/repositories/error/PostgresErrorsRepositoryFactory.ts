import { PostgresErrorsRepository } from '@infra/database/typeorm/repositories/postgres/PostgresErrorsRepository';

let postgresErrorsRepository: PostgresErrorsRepository;

export function makePostgresErrorsRepository() {
  if (!postgresErrorsRepository) {
    postgresErrorsRepository = new PostgresErrorsRepository();
  }

  return postgresErrorsRepository;
}

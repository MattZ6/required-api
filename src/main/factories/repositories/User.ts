import { PostgresUsersRepository } from '@infra/database/typeorm/repositories/postgres/PostgresUsersRepository';

let postgresUsersRepository: PostgresUsersRepository;

export function makeUsersRepository() {
  if (!postgresUsersRepository) {
    postgresUsersRepository = new PostgresUsersRepository();
  }

  return postgresUsersRepository;
}

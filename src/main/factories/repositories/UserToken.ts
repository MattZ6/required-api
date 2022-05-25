import { PostgresUserTokensRepository } from '@infra/database/typeorm/repositories/postgres/PostgresUserTokensRepository';

let postgresUserTokensRepository: PostgresUserTokensRepository;

export function makeUserTokensRepository() {
  if (!postgresUserTokensRepository) {
    postgresUserTokensRepository = new PostgresUserTokensRepository();
  }

  return postgresUserTokensRepository;
}

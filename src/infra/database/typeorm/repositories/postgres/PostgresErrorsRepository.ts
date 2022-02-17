import { getRepository, Repository } from 'typeorm';

import { ISaveErrorRepository } from '@application/protocols/repositories/error';

import { Error } from '@infra/database/typeorm/entities/Error';

export class PostgresErrorsRepository implements ISaveErrorRepository {
  private repository: Repository<Error>;

  constructor() {
    this.repository = getRepository(Error);
  }

  async save(data: ISaveErrorRepository.Input): Promise<void> {
    const {
      user_id,
      exception_was_thrown_in,
      stack,
      resource_url,
      http_method,
    } = data;

    const error = this.repository.create({
      user_id,
      exception_was_thrown_in,
      stack,
      resource_url,
      http_method,
    });

    await this.repository.save(error);
  }
}

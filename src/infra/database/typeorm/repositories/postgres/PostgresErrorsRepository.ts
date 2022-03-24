import { Repository } from 'typeorm';

import { ISaveErrorRepository } from '@application/protocols/repositories/error';

import { AppDataSource } from '@infra/database/typeorm';
import { Error } from '@infra/database/typeorm/entities/Error';

export class PostgresErrorsRepository implements ISaveErrorRepository {
  private repository: Repository<Error>;

  constructor() {
    this.repository = AppDataSource.getRepository(Error);
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

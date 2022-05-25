import { Repository } from 'typeorm';

import { ICreateErrorRepository } from '@application/protocols/repositories/error';

import { AppDataSource } from '@infra/database/typeorm';
import { Error } from '@infra/database/typeorm/entities/Error';

export class PostgresErrorsRepository implements ICreateErrorRepository {
  private repository: Repository<Error>;

  constructor() {
    this.repository = AppDataSource.getRepository(Error);
  }

  async create(
    data: ICreateErrorRepository.Input
  ): Promise<ICreateErrorRepository.Output> {
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

    const errorEntity = await this.repository.save(error);

    return errorEntity;
  }
}

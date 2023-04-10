import { ICreateErrorRepository } from '@application/protocols/repositories/error'

import { makeErrorEntityMock } from '../../../../domain'

export class CreateErrorRepositorySpy implements ICreateErrorRepository {
  async create(
    _: ICreateErrorRepository.Input,
  ): Promise<ICreateErrorRepository.Output> {
    return makeErrorEntityMock()
  }
}

import { ISaveErrorRepository } from '@application/protocols/repositories/error';

export class SaveErrorRepositorySpy implements ISaveErrorRepository {
  async save(
    _: ISaveErrorRepository.Input
  ): Promise<ISaveErrorRepository.Output> {
    //
  }
}

import { IUpdateUserEmailUseCase } from '@domain/usecases/user/UpdateEmail'

import { makeUserMock } from '../../../../domain'

export class UpdateUserEmailUseCaseSpy implements IUpdateUserEmailUseCase {
  async execute(
    _: IUpdateUserEmailUseCase.Input,
  ): Promise<IUpdateUserEmailUseCase.Output> {
    return makeUserMock()
  }
}

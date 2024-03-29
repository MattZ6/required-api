import { ICreateUserUseCase } from '@domain/usecases/user/Create'

import { makeUserMock } from '../../../../domain'

export class CreateUserUseCaseSpy implements ICreateUserUseCase {
  async execute(
    _: ICreateUserUseCase.Input,
  ): Promise<ICreateUserUseCase.Output> {
    return makeUserMock()
  }
}

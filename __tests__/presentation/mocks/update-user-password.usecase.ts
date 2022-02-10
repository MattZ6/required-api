import { IUpdateUserPasswordUseCase } from '@domain/usecases/user/UpdateUserPassword';

import { makeUserMock } from '../../domain';

export class UpdateUserPasswordUseCaseSpy
  implements IUpdateUserPasswordUseCase
{
  async execute(
    _: IUpdateUserPasswordUseCase.Input
  ): Promise<IUpdateUserPasswordUseCase.Output> {
    return makeUserMock();
  }
}

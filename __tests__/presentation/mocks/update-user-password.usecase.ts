import { IUpdateUserPasswordUseCase } from '@domain/usecases/user/UpdateUserPassword';

export class UpdateUserPasswordUseCaseSpy
  implements IUpdateUserPasswordUseCase
{
  async execute(
    _: IUpdateUserPasswordUseCase.Input
  ): Promise<IUpdateUserPasswordUseCase.Output> {
    // That's all folks 🤷‍♀️
  }
}

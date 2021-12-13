import {
  IUpdateUserEmailUseCase,
  UpdateUserEmailDTO,
} from '@domain/usecases/UpdateUserEmail';

export class UpdateUserEmailUseCaseSpy implements IUpdateUserEmailUseCase {
  async execute(_: UpdateUserEmailDTO): Promise<void> {
    // That's all folks 🤷‍♀️
  }
}

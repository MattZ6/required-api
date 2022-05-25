import {
  UserAlreadyExistsWithProvidedEmailError,
  UserNotFoundWithProvidedIdError,
} from '@domain/errors';
import { IUpdateUserEmailUseCase } from '@domain/usecases/user/UpdateEmail';

import {
  ICheckIfUserExistsByEmailRepository,
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@application/protocols/repositories/user';

export class UpdateUserEmailUseCase implements IUpdateUserEmailUseCase {
  constructor(
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly checkIfUserExistsByEmail: ICheckIfUserExistsByEmailRepository,
    private readonly updateUserRepository: IUpdateUserRepository
  ) {}

  async execute(
    data: IUpdateUserEmailUseCase.Input
  ): Promise<IUpdateUserEmailUseCase.Output> {
    const { user_id, email } = data;

    const user = await this.findUserByIdRepository.findById({ id: user_id });

    if (!user) {
      throw new UserNotFoundWithProvidedIdError();
    }

    const isSameEmail =
      user.email.trim().toLowerCase() === email.trim().toLowerCase();

    if (!isSameEmail) {
      const emailAlreadyInUse =
        await this.checkIfUserExistsByEmail.checkIfExistsByEmail({ email });

      if (emailAlreadyInUse) {
        throw new UserAlreadyExistsWithProvidedEmailError();
      }
    }

    user.email = email;

    return this.updateUserRepository.update(user);
  }
}

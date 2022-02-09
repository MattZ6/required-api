import {
  UserAlreadyExistsWithProvidedEmailError,
  UserNotFoundWithProvidedIdError,
} from '@domain/errors';
import { IUpdateUserEmailUseCase } from '@domain/usecases/user/UpdateUserEmail';

import {
  ICheckIfUserExistsByEmailRepository,
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@data/protocols/repositories/user';

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

    const isSameEmail = user.email.toLowerCase() === email.toLowerCase();

    if (isSameEmail) {
      // TODO: Criar um error para este caso
      throw new Error('Este já é o seu e-mail');
    }

    const emailAlreadyInUse =
      await this.checkIfUserExistsByEmail.checkIfExistsByEmail({ email });

    if (emailAlreadyInUse) {
      throw new UserAlreadyExistsWithProvidedEmailError();
    }

    user.email = email;

    await this.updateUserRepository.update(user);
  }
}

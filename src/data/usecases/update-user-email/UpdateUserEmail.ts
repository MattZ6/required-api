import {
  UserAlreadyExistsWithThisEmailError,
  UserNotFoundWithThisIdError,
} from '@domain/errors';
import {
  IUpdateUserEmailUseCase,
  UpdateUserEmailDTO,
} from '@domain/usecases/UpdateUserEmail';

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

  async execute(data: UpdateUserEmailDTO): Promise<void> {
    const { user_id, email } = data;

    const user = await this.findUserByIdRepository.findById({ id: user_id });

    if (!user) {
      throw new UserNotFoundWithThisIdError();
    }

    const isSameEmail = user.email.toLowerCase() === email.toLowerCase();

    if (isSameEmail) {
      // TODO: Criar um error para este caso
      throw new Error('Este já é o seu e-mail');
    }

    const emailAlreadyInUse =
      await this.checkIfUserExistsByEmail.checkIfExistsByEmail({ email });

    if (emailAlreadyInUse) {
      throw new UserAlreadyExistsWithThisEmailError();
    }

    user.email = email;

    await this.updateUserRepository.update(user);
  }
}

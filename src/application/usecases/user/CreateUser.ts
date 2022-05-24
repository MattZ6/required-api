import { UserAlreadyExistsWithProvidedEmailError } from '@domain/errors';
import { ICreateUserUseCase } from '@domain/usecases/user/CreateUser';

import { IGenerateHashProvider } from '@application/protocols/providers/cryptography';
import {
  ICheckIfUserExistsByEmailRepository,
  ICreateUserRepository,
} from '@application/protocols/repositories/user';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly checkIfUserExistsByEmail: ICheckIfUserExistsByEmailRepository,
    private readonly generateHashProvider: IGenerateHashProvider,
    private readonly createUserRepository: ICreateUserRepository
  ) {}

  async execute(
    data: ICreateUserUseCase.Input
  ): Promise<ICreateUserUseCase.Output> {
    const { name, email, password } = data;

    const alreadyExists =
      await this.checkIfUserExistsByEmail.checkIfExistsByEmail({ email });

    if (alreadyExists) {
      throw new UserAlreadyExistsWithProvidedEmailError();
    }

    const passwordHash = await this.generateHashProvider.hash({
      value: password,
    });

    const user = await this.createUserRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });

    return user;
  }
}

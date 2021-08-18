import { UserAlreadyExistsWithThisEmailError } from '@domain/error/UserAlreadyExistsWithThisEmail';
import { IUserModel } from '@domain/models/User';
import { ICreateUserUseCase, CreateUserDTO } from '@domain/usecases/CreateUser';

import { ICreateHashProvider } from '@data/protocols/cryptography/hash/CreateHashProvider';
import { ICheckIfUserExistsByEmail } from '@data/protocols/repositories/user/CheckIfUserExistsByEmail';
import { ICreateUserRepository } from '@data/protocols/repositories/user/CreateUserRepository';

export class CreateUseUseCase implements ICreateUserUseCase {
  constructor(
    private readonly checkIfUserExistsByEmail: ICheckIfUserExistsByEmail,
    private readonly createHashProvider: ICreateHashProvider,
    private readonly createUserRepository: ICreateUserRepository
  ) {}

  async execute(data: CreateUserDTO): Promise<IUserModel> {
    const { name, email, password } = data;

    const alreadyExists =
      await this.checkIfUserExistsByEmail.checkIfExistsByEmail(email);

    if (alreadyExists) {
      throw new UserAlreadyExistsWithThisEmailError();
    }

    const passwordHash = await this.createHashProvider.hash(password);

    const user = await this.createUserRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });

    return user;
  }
}

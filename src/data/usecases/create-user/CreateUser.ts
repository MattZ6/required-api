import { UserAlreadyExistsWithThisEmailError } from '@domain/error/UserAlreadyExistsWithThisEmail';
import { IUserModel } from '@domain/models/User';
import { ICreateUserUseCase, CreateUserDTO } from '@domain/usecases/CreateUser';

import { ICreateHash } from '@data/protocols/cryptography/hash/CreateHash';
import { ICheckIfUserExistsByEmail } from '@data/protocols/repositories/user/CheckIfUserExistsByEmail';
import { ICreateUserRepository } from '@data/protocols/repositories/user/CreateUserRepository';

export class CreateUseUseCase implements ICreateUserUseCase {
  constructor(
    private readonly checkIfUserExistsByEmail: ICheckIfUserExistsByEmail,
    private readonly createHash: ICreateHash,
    private readonly createUserRepository: ICreateUserRepository
  ) {}

  async execute(data: CreateUserDTO): Promise<IUserModel> {
    const { name, email, password } = data;

    const alreadyExists =
      await this.checkIfUserExistsByEmail.checkIfExistsByEmail(email);

    if (alreadyExists) {
      throw new UserAlreadyExistsWithThisEmailError();
    }

    const passwordHash = await this.createHash.hash(password);

    const user = await this.createUserRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });

    return user;
  }
}

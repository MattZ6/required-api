import { UserAlreadyExistsWithThisEmailError } from '../../../domain/error/UserAlreadyExistsWithThisEmail';
import { IUserModel } from '../../../domain/models/User';
import {
  CreateUserDTO,
  ICreateUserUseCase,
} from '../../../domain/usecases/CreateUser';
import { ICreateHash } from '../../protocols/cryptography/hash/CreateHash';
import { ICheckIfUserExistsByEmail } from '../../protocols/repositories/user/CheckIfUserExistsByEmail';
import { ICreateUserRepository } from '../../protocols/repositories/user/CreateUserRepository';

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

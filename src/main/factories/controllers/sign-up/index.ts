import { CreateUseUseCase } from '../../../../data/usecases/create-user/CreateUser';
import { BcryptHashProvider } from '../../../../infra/criptography/hash/BcryptHashProvider';
import PostgresUsersRepository from '../../../../infra/database/typeorm/repositories/postgres/PostgresUsersRepository';
import { SignUpController } from '../../../../presentation/controllers/sign-up/SignUpController';
import { IController } from '../../../../presentation/protocols/Controller';

export const makeSignUpController = (): IController => {
  const BcryotHashProvider = new BcryptHashProvider(12);

  const createUserUseCase = new CreateUseUseCase(
    PostgresUsersRepository,
    BcryotHashProvider,
    PostgresUsersRepository
  );

  return new SignUpController(createUserUseCase);
};

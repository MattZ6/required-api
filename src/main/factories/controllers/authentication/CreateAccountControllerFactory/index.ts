import { CreateUseUseCase } from '../../../../../data/usecases/create-user/CreateUser';
import { BcryptHashProvider } from '../../../../../infra/criptography/hash/BcryptHashProvider';
import PostgresUsersRepository from '../../../../../infra/database/typeorm/repositories/postgres/PostgresUsersRepository';
import { CreateAccountController } from '../../../../../presentation/controllers/authentication/CreateAccountController';
import { IController } from '../../../../../presentation/protocols/Controller';

export const makeCreateAccountController = (): IController => {
  const BcryotHashProvider = new BcryptHashProvider(12);

  const createUserUseCase = new CreateUseUseCase(
    PostgresUsersRepository,
    BcryotHashProvider,
    PostgresUsersRepository
  );

  return new CreateAccountController(createUserUseCase);
};

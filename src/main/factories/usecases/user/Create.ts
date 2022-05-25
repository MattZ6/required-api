import { CreateUserUseCase } from '@application/usecases/user/Create';

import { makeHashProvider } from '@main/factories/providers/cryptography/Hash';
import { makeUsersRepository } from '@main/factories/repositories/User';

export function makeCreateUserUseCase() {
  const usersRepository = makeUsersRepository();

  const hashProvider = makeHashProvider();

  return new CreateUserUseCase(usersRepository, hashProvider, usersRepository);
}

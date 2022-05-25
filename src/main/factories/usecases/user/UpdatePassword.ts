import { UpdateUserPasswordUseCase } from '@application/usecases/user/UpdatePassword';

import { makeHashProvider } from '@main/factories/providers/cryptography/Hash';
import { makeUsersRepository } from '@main/factories/repositories/User';

export function makeUpdateUserPasswordUseCase() {
  const usersRepository = makeUsersRepository();

  const hashProvider = makeHashProvider();

  return new UpdateUserPasswordUseCase(
    usersRepository,
    hashProvider,
    hashProvider,
    usersRepository
  );
}

import { User } from '@domain/entities/User';

interface ICreateUserRepository {
  create(
    data: ICreateUserRepository.Input
  ): Promise<ICreateUserRepository.Output>;
}

namespace ICreateUserRepository {
  export type Input = {
    name: string;
    email: string;
    password_hash: string;
  };

  export type Output = User;
}

export { ICreateUserRepository };

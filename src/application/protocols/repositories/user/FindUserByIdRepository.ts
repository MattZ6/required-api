import { User } from '@domain/entities/User';

interface IFindUserByIdRepository {
  findById(
    data: IFindUserByIdRepository.Input
  ): Promise<IFindUserByIdRepository.Output>;
}

namespace IFindUserByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = User | undefined;
}

export { IFindUserByIdRepository };

import { User } from '@domain/entities/User';

interface IUpdateUserNameUseCase {
  execute(
    data: IUpdateUserNameUseCase.Input
  ): Promise<IUpdateUserNameUseCase.Output>;
}

namespace IUpdateUserNameUseCase {
  export type Input = {
    user_id: string;
    name: string;
  };

  export type Output = User;
}

export { IUpdateUserNameUseCase };

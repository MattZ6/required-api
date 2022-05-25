import { User } from '@domain/entities/User';

interface IUpdateUserEmailUseCase {
  execute(
    data: IUpdateUserEmailUseCase.Input
  ): Promise<IUpdateUserEmailUseCase.Output>;
}

namespace IUpdateUserEmailUseCase {
  export type Input = Pick<User, 'email'> & {
    user_id: string;
  };

  export type Output = User;
}

export { IUpdateUserEmailUseCase };

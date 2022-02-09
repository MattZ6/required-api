import { IUser } from '@domain/models/User';

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

  export type Output = IUser;
}

export { IUpdateUserNameUseCase };

import { IUser } from '@domain/models/User';

interface IGetProfileUseCase {
  execute(data: IGetProfileUseCase.Input): Promise<IGetProfileUseCase.Output>;
}

namespace IGetProfileUseCase {
  export type Input = {
    user_id: string;
  };

  export type Output = IUser;
}

export { IGetProfileUseCase };

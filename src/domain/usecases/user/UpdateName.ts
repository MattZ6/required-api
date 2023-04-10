import { User } from '@domain/entities/User'

interface IUpdateUserNameUseCase {
  execute(
    data: IUpdateUserNameUseCase.Input,
  ): Promise<IUpdateUserNameUseCase.Output>
}

namespace IUpdateUserNameUseCase {
  export type Input = Pick<User, 'name'> & {
    user_id: string
  }

  export type Output = User
}

export { IUpdateUserNameUseCase }

import { User } from '@domain/entities/User'

interface IUpdateUserRepository {
  update(
    data: IUpdateUserRepository.Input,
  ): Promise<IUpdateUserRepository.Output>
}

namespace IUpdateUserRepository {
  export type Input = Pick<User, 'id'> &
    Pick<Partial<User>, 'name' | 'email' | 'password_hash'>

  export type Output = User
}

export { IUpdateUserRepository }

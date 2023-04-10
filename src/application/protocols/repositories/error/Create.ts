import { Error } from '@domain/entities/Error'

interface ICreateErrorRepository {
  create(
    data: ICreateErrorRepository.Input,
  ): Promise<ICreateErrorRepository.Output>
}

namespace ICreateErrorRepository {
  export type Input = Pick<
    Error,
    | 'user_id'
    | 'stack'
    | 'exception_was_thrown_in'
    | 'http_method'
    | 'resource_url'
  >

  export type Output = Error
}

export { ICreateErrorRepository }

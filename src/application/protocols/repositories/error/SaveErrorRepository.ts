import { IError } from '@domain/models/Error';

interface ISaveErrorRepository {
  save(data: ISaveErrorRepository.Input): Promise<ISaveErrorRepository.Output>;
}

namespace ISaveErrorRepository {
  export type Input = Pick<
    IError,
    | 'user_id'
    | 'stack'
    | 'exception_was_thrown_in'
    | 'http_method'
    | 'resource_url'
  >;

  export type Output = void;
}

export { ISaveErrorRepository };

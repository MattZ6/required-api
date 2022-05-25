import { IHttpResponse } from '@presentation/protocols';

import { ErrorDTO, toErrorDTO } from '../errorDTO';

export function unprocessableEntity(error: Error): IHttpResponse<ErrorDTO> {
  return {
    statusCode: 422,
    body: toErrorDTO(error),
  };
}

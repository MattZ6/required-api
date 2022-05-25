import { IHttpResponse } from '@presentation/protocols';

import { ErrorDTO, toErrorDTO } from '../errorDTO';

export function unauthorized(error: Error): IHttpResponse<ErrorDTO> {
  return {
    statusCode: 401,
    body: toErrorDTO(error),
  };
}

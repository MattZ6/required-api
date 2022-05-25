import { IHttpResponse } from '@presentation/protocols';

import { ErrorDTO, toErrorDTO } from '../errorDTO';

export function conflict(error: Error): IHttpResponse<ErrorDTO> {
  return {
    statusCode: 409,
    body: toErrorDTO(error),
  };
}

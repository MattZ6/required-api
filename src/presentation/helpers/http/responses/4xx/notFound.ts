import { IHttpResponse } from '@presentation/protocols';

import { ErrorDTO, toErrorDTO } from '../errorDTO';

export function notFound(error: Error): IHttpResponse<ErrorDTO> {
  return {
    statusCode: 404,
    body: toErrorDTO(error),
  };
}

import { Request, Response } from 'express';

import { ServerError } from '@presentation/errors/ServerError';
import { IController } from '@presentation/protocols/Controller';

export const adaptRoute = (controller: IController) => {
  return async (request: Request, response: Response): Promise<Response> => {
    try {
      const controllerResponse = await controller.handle({
        body: request.body ?? {},
        params: request.params ?? {},
        query: request?.query ?? {},
        headers: request.headers ?? {},
        user_id: request.user_id,
      });

      return response
        .status(controllerResponse.statusCode)
        .json(controllerResponse.body);
    } catch (error) {
      // TODO: Adicionar novas tratativas de erros baseado no tipo do erro

      // TODO: Salvar erros não tratados no banco

      console.log(error);

      return response.status(500).json(new ServerError());
    }
  };
};

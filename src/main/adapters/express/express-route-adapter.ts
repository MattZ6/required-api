import { Request, Response } from 'express';

import { ServerError } from '../../../presentation/errors/ServerError';
import { IController } from '../../../presentation/protocols/Controller';

export const adaptRoute =
  (controller: IController) =>
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const response = await controller.handle({
        body: req.body,
      });

      return res.status(response.statusCode).json(response.body);
    } catch (error) {
      // TODO: Adicionar novas tratativas de erros baseado no tipo do erro

      // TODO: Salvar erros não tratados no banco

      console.log(error);

      return res.status(500).json(new ServerError());
    }
  };

import { NextFunction, Request, Response } from 'express';

import { IMiddleware } from '@presentation/protocols';

export function adaptMiddleware(middleware: IMiddleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const middlewareResponse = await middleware.handle({
        body: request?.body ?? {},
        query: request?.query ?? {},
        params: request?.params ?? {},
        headers: request?.headers ?? {},
      });

      const isSuccessful =
        middlewareResponse.statusCode >= 200 &&
        middlewareResponse.statusCode <= 299;

      if (!isSuccessful) {
        return response
          .status(middlewareResponse.statusCode)
          .json(middlewareResponse.body);
      }

      Object.assign(request, middlewareResponse.body);

      return next();
    } catch (error) {
      console.log(error);

      // TODO: Retornar um internal server error
      return response.status(500).json();
    }
  };
}

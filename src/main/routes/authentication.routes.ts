import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { makeAuthenticateUserController } from '@main/factories/controllers/authentication/AuthenticateUserControllerFactory';
import { makeCreateAccountController } from '@main/factories/controllers/authentication/CreateAccountControllerFactory';

const authenticationRoutes = Router();

authenticationRoutes.post(
  '/account',
  adaptRoute(makeCreateAccountController())
);

authenticationRoutes.post(
  '/login',
  adaptRoute(makeAuthenticateUserController())
);

export default authenticationRoutes;

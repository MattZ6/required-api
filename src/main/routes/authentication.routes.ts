import { Router } from 'express';

import { adaptRoute } from '../adapters/express/express-route-adapter';
import { makeAuthenticateUserController } from '../factories/controllers/authentication/AuthenticateUserControllerFactory';
import { makeCreateAccountController } from '../factories/controllers/authentication/CreateAccountControllerFactory';

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

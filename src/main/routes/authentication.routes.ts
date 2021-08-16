import { Router } from 'express';

import { adaptRoute } from '../adapters/express/express-route-adapter';
import { makeCreateAccountController } from '../factories/controllers/authentication/CreateAccountControllerFactory';

const authenticationRoutes = Router();

authenticationRoutes.post(
  '/account',
  adaptRoute(makeCreateAccountController())
);

export default authenticationRoutes;

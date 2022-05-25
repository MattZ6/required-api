import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/route';
import { makeAuthenticateUserController } from '@main/factories/controllers/user/Authenticate';
import { makeCreateAccountController } from '@main/factories/controllers/user/CreateAccount';
import { makeRefreshUserAccessTokenController } from '@main/factories/controllers/user/RefreshAccessToken';

const authenticationRoutes = Router();

authenticationRoutes.post(
  '/sign/up',
  adaptRoute(makeCreateAccountController())
);

authenticationRoutes.post(
  '/sign/in',
  adaptRoute(makeAuthenticateUserController())
);

authenticationRoutes.post(
  '/refresh',
  adaptRoute(makeRefreshUserAccessTokenController())
);

export default authenticationRoutes;

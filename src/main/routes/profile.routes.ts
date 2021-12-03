import { Router } from 'express';

import { adaptRoute } from '@main/adapters/express/express-route-adapter';
import { authenticationMiddleware } from '@main/config/middlewares/authentication';
import { makeGetProfileController } from '@main/factories/controllers/profile/GetProfileControllerFactory';
import { makeUpdateProfileNameController } from '@main/factories/controllers/profile/UpdateProfileNameControllerFactory';

const profileRoutes = Router();

profileRoutes.get(
  '/',
  authenticationMiddleware,
  adaptRoute(makeGetProfileController())
);

profileRoutes.patch(
  '/name',
  authenticationMiddleware,
  adaptRoute(makeUpdateProfileNameController())
);

export default profileRoutes;
